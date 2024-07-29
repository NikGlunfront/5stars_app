import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestButton from "../../components/UI/RequestButton/RequestButton";
import BoxWrapper from "../../components/Wrappers/BoxWrapper";
import { useTelegram } from "../../hooks/useTelegram";
import { useAddStarsMutation, useGetBonusQuery, useSavePrizeWinMutation } from "../../store/services/starsGame";
import { resetPrize, setPickedPrizeStar, setPrizesFromHistory } from "../../store/slices/addStarSlice/addStarSlice";
import AddStarsBetPrize from "./AddStarsBetPrize";
import AddStarsTimers from "./AddStarsTimers";

const prizeData = {}

const AddStarsGamePrize = ({
    pickedAddStarValue
}) => {
    const [pickedStarBet, setPickedStarBet] = useState(0)
    const [isExpired, setIsExpired] = useState(false)
    const {user: tgUser, sendAlert} = useTelegram()
    const dispatch = useDispatch()
    const {data: bonusData, isLoading: isBonusDataLoading} = useGetBonusQuery(tgUser)
    const [savePrizeWin, {data: prizePost, isLoading: isPrizePostLoading}] = useSavePrizeWinMutation()
    const [addStarsClick, { data: addStarsData, isLoading: isAddStarsLoading, error: isAddStarsError}] = useAddStarsMutation()
    const { 
        isGamePrizeFinished,
        activeGamePrize,
        pickedStarPrize,
        prizeId
    } = useSelector(state => state.addStar)

    const handlePrizeStarChange = (val) => {
        setPickedStarBet(val)
        dispatch(setPickedPrizeStar(val))
    }

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
        if (bonusData?.prize && !isBonusDataLoading) {
            dispatch(setPrizesFromHistory({
                pickedStar: parseInt(bonusData?.prize?.picked_star),
                prizes: bonusData?.prize?.prizes,
                id: parseInt(bonusData?.prize?.id)
            }))
            if (hasMoreThan10MinutesPassed(bonusData.prize.created, bonusData.prize.current_time)) {
                setIsExpired(true)
                if (bonusData.prize.picked_star === "0") {
                    setPickedStarBet(0)
                }
            } else {
                setIsExpired(false)
            }
        } else {
            dispatch(resetPrize())
        }
    }, [bonusData, isBonusDataLoading])

    const revealPrize = async () => {
        if (!isGamePrizeFinished && prizeId) {
            await savePrizeWin({
                tg_id: tgUser,
                picked_star: pickedStarBet,
                game_id: prizeId
            })
            // dispatch(revealPrizeResult(pickedStarBet))
        } else {
            const prizeVal = activeGamePrize.filter(item => item.id === pickedStarPrize)[0]['value'] | null
            if (prizeVal) {
                await addStarsClick({
                    tg_id: tgUser,
                    amount: prizeVal,
                    type: 'DEF',
                    a_type: 'P',
                    params: {
                        prize_id: prizeId
                    }
                })
                dispatch(resetPrize())
                sendAlert(`Your balance has been charged on ${prizeVal} Stars`)
            }
        }
    }

    const resetExpiredPrize = async () => {
        await savePrizeWin({
            tg_id: tgUser,
            picked_star: pickedStarBet,
            game_id: prizeId,
            expire: true
        })
    }
    if (!activeGamePrize.length || !bonusData.prize) {
        return
    }

    return (
        <BoxWrapper className={'s5-game add-star-game add-star-game_prize' + (bonusData?.prize?.error ? " _disabled" : "") + (isExpired ? ' _expired' : "")}>
            <div className="add-star-game__topper">
                <span>Bonus Time</span>
                <AddStarsTimers activeTime={(bonusData?.prize?.created)} />
            </div>
            <div className="stars-s5-game">
                {false
                    ?
                    // <StarsResult />
                    <div></div>
                    :
                    <AddStarsBetPrize 
                        pickedStar={pickedStarPrize}
                        betAmount={1}
                        isExpired={isExpired}
                        handleBet={handlePrizeStarChange}
                    />
                }
            </div>
            {!isExpired
                ?
                <div className="s5-game__text">
                    {!isGamePrizeFinished 
                        ?
                        <p>Find the bonus up to <b>500%</b></p>
                        :
                        <p>You won prize 
                            <strong style={{marginLeft: '1rem', marginRight: '1rem'}}>
                                {activeGamePrize.length && pickedStarPrize
                                    ? <span>{activeGamePrize.filter(item => item.id === pickedStarPrize)[0]['value']}</span>
                                    : ""
                                }
                            </strong>
                            Free stars
                        </p>
                    }
                </div>
            
                :
                <div className="s5-game__text">
                    <p>Your prize has expired
                        <strong style={{marginLeft: '1rem', marginRight: '1rem'}}>
                            <span>{pickedStarPrize === 0 ? "500" : activeGamePrize.filter(item => item.id === pickedStarPrize)[0]['value']}</span>
                        </strong>
                    </p>
                </div>
            }
            {!isExpired
                ?
                <RequestButton 
                    className={"s5-game__btn" + ((pickedStarPrize && !isGamePrizeFinished) || (isGamePrizeFinished && pickedStarPrize) ? ' _active' : '')} 
                    onClick={revealPrize}
                    // isloading={isCalculatedGameLoading || isNewGameLoading}
                >
                    <div>{isGamePrizeFinished ? (pickedStarPrize ? `Add ${activeGamePrize.filter(item => item.id === pickedStarPrize)[0]['value']} Stars` : 'Add Stars') : 'Tap & Win Prize'}</div>
                    <span className={(!isGamePrizeFinished) || (!pickedAddStarValue) ? "_hidden" : ''}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83401 0.439639C6.09948 -0.146547 6.90052 -0.146546 7.16599 0.43964L8.55758 3.51234C8.6646 3.74867 8.87989 3.91196 9.12877 3.9456L12.3576 4.38201C12.9725 4.46511 13.2194 5.25373 12.7698 5.6981L10.3976 8.04239C10.2165 8.22134 10.1348 8.48364 10.1807 8.73915L10.7824 12.0908C10.8966 12.7268 10.2492 13.2149 9.70432 12.9035L6.85435 11.2746C6.63366 11.1485 6.36635 11.1485 6.14565 11.2746L3.29568 12.9035C2.75084 13.2149 2.10336 12.7268 2.21756 12.0908C2.39945 11.0631 2.53616 10.1778 2.78159 9.58162C3.47699 8.517 7.19942 7.11169 7.0318 6.88987C7.0767 6.68584 2.69978 7.70788 1.96348 7.28203L1.55442 7.02652L0.230238 5.6981C-0.21942 5.25373 0.0275324 4.46511 0.642364 4.38201L3.87123 3.9456C4.12011 3.91196 4.3354 3.74867 4.44243 3.51234L5.83401 0.439639Z" fill="white"/>
                        </svg>
                        {pickedAddStarValue && isGamePrizeFinished ? pickedAddStarValue : ''}
                    </span>
                </RequestButton>
                :
                <RequestButton 
                    className={"s5-game__btn _active"} 
                    onClick={resetExpiredPrize}
                    // isloading={isCalculatedGameLoading || isNewGameLoading}
                >
                    TRY AGAIN
                </RequestButton>
            }
        </BoxWrapper>
    )
};

export default AddStarsGamePrize;
