import React, { useEffect, useState } from "react";
import RequestButton from "../../components/UI/RequestButton/RequestButton";
import BoxWrapper from "../../components/Wrappers/BoxWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useAddStarsMutation, useAddTriesMutation, useGetAttemptsQuery, useGetBonusQuery, useSaveAttBonusGameMutation, useSaveBonusGameMutation } from "../../store/services/starsGame";
import { useTelegram } from "../../hooks/useTelegram";
import greenStar from '../../assets/img/icons/game/bet_star_green.svg'
import { resetAttBonus, revealAttBonusResult, setAttBonusFromHistory } from "../../store/slices/attemptsSlice/attemptsSlice";
import TriesTimers from "./TriesTimers";
import TriesBet from "./TriesBet";

const TriesGame = ({
    pickedAddStarValue = 50,
    changePrizePercent
}) => {
    const [pickedStarBet, setPickedStarBet] = useState(0)
    const [isExpired, setIsExpired] = useState(false)
    const [btnText, setBtnText] = useState('Tap & Win Bonus')
    const { user: tgUser, sendAlert, hideTgButton } = useTelegram()
    const [saveBonusGame, {data: bonusGamePost, isLoading: isBonusGamePostLoading}] = useSaveAttBonusGameMutation()
    const [addTriesClick, { data: addTriesData, isLoading: isAddTriesLoading, error: isAddTriesError}] = useAddTriesMutation()
    const {data: bonusData, isLoading: isBonusDataLoading} = useGetAttemptsQuery(tgUser)
    const dispatch = useDispatch()
    const { 
        activeBonusGame,
        isBonusGameFinished,
        pickedStar,
        isVisibleBonus,
        bonus_id
    } = useSelector(state => state.attempts)

    function hasMoreThan10MinutesPassed(timestampString,  currentDate) {
        // Преобразование строки в объект Date
        const timestamp = new Date(timestampString);
      
        // Получение текущего времени
        const now = new Date(currentDate);
        
      
        // Вычисление разницы в миллисекундах
        const differenceInMillis = now - timestamp;
      
        // Преобразование в минуты
        const differenceInMinutes = differenceInMillis / (1000 * 60);
      
        // Проверка, больше ли разница 10 минут
        return differenceInMinutes >= 10;
    }

    useEffect(() => {

        if (bonusData?.bonus && !isBonusDataLoading && !bonusData?.bonus?.new) {
            dispatch(setAttBonusFromHistory({
                pickedStar: parseInt(bonusData?.bonus.picked_star),
                activeBonus: bonusData?.bonus.bonuses,
                id: parseInt(bonusData.bonus.id)
            }))
            setPickedStarBet(parseInt(bonusData?.bonus.picked_star))

            if (hasMoreThan10MinutesPassed(bonusData.bonus.created, bonusData.bonus.curtime)) {
                setIsExpired(true)
                if (bonusData.bonus.picked_star === "0") {
                    setPickedStarBet(0)
                }
            } else {
                setIsExpired(false)
            }
        }

        if (isExpired) {
            hideTgButton()
        }

    }, [bonusData, isBonusDataLoading])

    useEffect(() => {
        if (isBonusGameFinished && !isBonusDataLoading) {
            // changePrizePercent(activeBonusGame.filter(item => item.id === pickedStar)[0]['value'] + "%")
            if (pickedAddStarValue) {
                setBtnText(`ADD ${pickedAddStarValue + (activeBonusGame.filter(item => item.id === pickedStar)[0]['value'])} TRIES`)
            } else {
                setBtnText('ADD TRIES')
            }
        } else {
            setBtnText('TAP & WIN BONUS')
        }
        if (isExpired) {
            if (pickedAddStarValue) {
                setBtnText(`ADD ${pickedAddStarValue} TRIES`)
            } else {
                setBtnText('ADD TRIES')
            }
        }
    }, [isBonusGameFinished, isBonusDataLoading, pickedAddStarValue, activeBonusGame, pickedStar, bonusData, isExpired])

    const revealBonus = async () => {
        if (!isBonusGameFinished && !isExpired) {
            await saveBonusGame({
                tg_id: tgUser,
                picked_star: pickedStarBet,
                bonus_id: bonus_id,
                bonuses: activeBonusGame
            })
            dispatch(revealAttBonusResult(pickedStarBet))
        } else {
            if (isExpired) {
                addTriesNoBonusHandler()
            } else {
                addTriesWithBonusHandler()
            }
        }
    }

    const addTriesNoBonusHandler = async () => {
        await addTriesClick({
            tg_id: tgUser,
            bonus_id: bonus_id,
            picked_star: pickedStar,
            type: "B",
            value: pickedAddStarValue,
        })
        sendAlert(`Your profile has been charged on ${pickedAddStarValue} Tries`)
        dispatch(resetAttBonus())
    }
    const addTriesWithBonusHandler = async () => {
        let isAddStarsLoading = false
        if (!isAddStarsLoading && pickedStarBet) {
            await addTriesClick({
                tg_id: tgUser,
                bonus_id: bonus_id,
                picked_star: pickedStar,
                type: "B",
                value: pickedAddStarValue + activeBonusGame.filter(item => item.id === pickedStar)[0]['value'],
            })
            sendAlert(`Your profile has been charged on ${pickedAddStarValue + (activeBonusGame.filter(item => item.id === pickedStar)[0]['value'])} Tries`)
            dispatch(resetAttBonus())
        }
    }

    // useEffect(() => {
    //     if (!isAddStarsLoading && addStarsData) {
    //         isAddStarsError ? sendAlert('Произошла ошибка при пополнении баланса') : sendAlert(`Баланс успешно пополнен на \n${addStarsData.amount * (pickedStarBet + 1)} Stars`)
    //     }
    // }, [isAddStarsLoading]) 

    if (!isVisibleBonus || !bonusData?.bonus) {
        return
    }

    return (
        <BoxWrapper className={'s5-game add-star-game add-star-game_tries' + (isExpired ? " _disabled" : "")}>
            <div className="add-star-game__topper">
                <span>Bonus Time</span>
                <TriesTimers activeTime={bonusData?.bonus?.created} currentTime={bonusData?.bonus?.curtime} />
            </div>
            <div className="stars-s5-game">
                {false
                    ?
                    // <StarsResult />
                    <div></div>
                    :
                    <TriesBet 
                        pickedStar={pickedStarBet}
                        betAmount={1}
                        isExpired={isExpired}
                        handleBet={setPickedStarBet}
                    />
                }
            </div>
            {!isExpired
                ?
                <div className="s5-game__text">
                    {!isBonusGameFinished 
                        ?
                        <p>Find the bonus up to <b>250</b> tries</p>
                        :
                        <p>You won bonus 
                            <strong style={{marginLeft: '1rem'}}>
                                {activeBonusGame.length && pickedStar
                                    ? <span>{activeBonusGame.filter(item => item.id === pickedStar)[0]['value']} tries</span>
                                    : ""
                                }
                            </strong>
                        </p>
                    }
                </div>
                :
                <div className="s5-game__text">
                    <p>Your bonus has expired
                        <strong style={{marginLeft: '1rem', marginRight: '1rem'}}>
                            <span>{pickedStar === 0 ? "500" : activeBonusGame.filter(item => item.id === pickedStar)[0]['value']}</span>
                        </strong>
                        tries
                    </p>
                </div>

            }
            <RequestButton 
                className={"s5-game__btn" + ((pickedStarBet && !isBonusGameFinished) || (isBonusGameFinished && pickedStar && pickedAddStarValue) || (isExpired && pickedAddStarValue) ? ' _active' : '')} 
                onClick={revealBonus}
                isloading={!bonusData?.bonus || isBonusDataLoading}
                disabled={isExpired && !pickedAddStarValue}
            >
                <div>{btnText}</div>
                <span className={(!isBonusGameFinished && !isExpired) ? "_hidden" : ''}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83401 0.439639C6.09948 -0.146547 6.90052 -0.146546 7.16599 0.43964L8.55758 3.51234C8.6646 3.74867 8.87989 3.91196 9.12877 3.9456L12.3576 4.38201C12.9725 4.46511 13.2194 5.25373 12.7698 5.6981L10.3976 8.04239C10.2165 8.22134 10.1348 8.48364 10.1807 8.73915L10.7824 12.0908C10.8966 12.7268 10.2492 13.2149 9.70432 12.9035L6.85435 11.2746C6.63366 11.1485 6.36635 11.1485 6.14565 11.2746L3.29568 12.9035C2.75084 13.2149 2.10336 12.7268 2.21756 12.0908C2.39945 11.0631 2.53616 10.1778 2.78159 9.58162C3.47699 8.517 7.19942 7.11169 7.0318 6.88987C7.0767 6.68584 2.69978 7.70788 1.96348 7.28203L1.55442 7.02652L0.230238 5.6981C-0.21942 5.25373 0.0275324 4.46511 0.642364 4.38201L3.87123 3.9456C4.12011 3.91196 4.3354 3.74867 4.44243 3.51234L5.83401 0.439639Z" fill="white"/>
                    </svg>
                    {100}
                </span>
            </RequestButton>
        </BoxWrapper>
    )
};

export default TriesGame;
