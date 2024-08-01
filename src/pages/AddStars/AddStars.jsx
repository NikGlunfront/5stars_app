import React, { useEffect, useState } from "react"
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { useAddStarsMutation, useGetBonusQuery, useLazyAddStarsQuery } from "../../store/services/starsGame";
import { useTelegram } from "../../hooks/useTelegram";
import AddStarsGame from "./AddStarsGame";
import RequestButton from "../../components/UI/RequestButton/RequestButton";
import { useDispatch, useSelector } from "react-redux";
import { resetBonus } from "../../store/slices/addStarSlice/addStarSlice";

const starVars = [
    {id: 3, val: 100, iconsCount: 2},
    {id: 7, val: 250, iconsCount: 4},
    {id: 2, val: 500, iconsCount: 6},
    {id: 6, val: 1000, iconsCount: 8},
    {id: 8, val: 1500, iconsCount: 9},
    {id: 10, val: 2500, iconsCount: 10},
    // {id: 1, val: 50, iconsCount: 1},
    // {id: 4, val: 750, iconsCount: 7},
    // {id: 5, val: 150, iconsCount: 3},
    // {id: 9, val: 350, iconsCount: 5},
]

const AddStars= ({

}) => {
    const [pickedVal, setPickedVal] = useState(0)
    const [percentInfo, setPercentInfo] = useState('up to 500%')
    const dispatch = useDispatch()

    const {
        setIsWithDraw,
        mainBalance
    } = useApp()

    const { 
        sendAlert, 
        user: tgUser, 
        hideTgButton,
        handleMainButtonClick
     } = useTelegram()

    const {pickedStar, isBonusGameFinished} = useSelector(state => state.addStar)

    const [addStarsClick, { data: addStarsData, isLoading: isAddStarsLoading, error: isAddStarsError}] = useAddStarsMutation()
    const {data: bonusData, isLoading: isBonusDataLoading} = useGetBonusQuery(tgUser)

    const { scrollTop } = useScroll()
    const location = useLocation()

    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
        hideTgButton()
        setIsWithDraw(false)
    }, [])

    const handleMainButtonAddStars = (val) => {
        addStarsHandler(val)
        hideTgButton()
    }
    const handlePickStarAmount = (val) => {
        if (pickedVal !== val) {
            setPickedVal(val)
            handleMainButtonClick((val) => handleMainButtonAddStars(val))
        } else {
            setPickedVal(0)
        }
    }

    const addStarsHandler = async (pickedVal) => {
        if (!isAddStarsLoading) {
            await addStarsClick({
                tg_id: tgUser,
                amount: pickedVal,
                type: 'DEF',
                a_type: 'A' 
            })
            dispatch(resetBonus())
        }
    }

    useEffect(() => {
        // if (pickedVal > 0 && mainBalance < 10 && !pickedStar) {
        //     showTgButton(`ADD ${pickedVal} Stars`)
        //     enableTgButton()
        // } else {
        //     hideTgButton()
        //     disableTgButton()
        // }
    }, [pickedVal, mainBalance, pickedStar])

    useEffect(() => {
        if (!isAddStarsLoading && addStarsData) {
            isAddStarsError ? sendAlert('Произошла ошибка при пополнении баланса') : sendAlert(`Баланс успешно пополнен на \n${addStarsData.amount} Stars`)
        }
    }, [isAddStarsLoading]) 
    return (
        <div className="addstars-page">

            <AddStarsGame 
                pickedAddStarValue={pickedVal}
                changePrizePercent={setPercentInfo}
            />

            {((bonusData?.bonus && isBonusGameFinished) || (bonusData?.bonus?.error)) &&
            <div>
                <p style={{textAlign: 'center', fontSize: '1.6rem'}}>Choose an amount and get the bonus <b>{percentInfo}</b>, <br />till timer is counting down.</p>
                <div className="addstars-page__content">
                    {starVars.map(starItem => (
                        <div key={starItem.id} className={"addstars-item" + (starItem.val === pickedVal ? ' _active' : '')} onClick={() => handlePickStarAmount(starItem.val)}>
                            {starItem.val.toLocaleString()} stars
                        </div>
                    ))}
                </div>
            </div>
            }
            {/* <RequestButton
                onClick={addStarsHandler}
                isloading={isAddStarsLoading}
                disabled={pickedVal === 0}
            >Пополнить</RequestButton> */}
        </div>
    )
};

export default AddStars
