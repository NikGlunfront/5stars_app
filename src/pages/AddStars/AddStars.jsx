import React, { useEffect, useState } from "react"
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { useAddStarsMutation, useLazyAddStarsQuery } from "../../store/services/starsGame";
import { useTelegram } from "../../hooks/useTelegram";
import AddStarsGame from "./AddStarsGame";
import RequestButton from "../../components/UI/RequestButton/RequestButton";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch()

    const {
        setIsWithDraw,
        mainBalance
    } = useApp()

    const { 
        sendAlert, 
        user: tgUser, 
        hideTgButton,
        showTgButton,
        handleMainButtonClick
     } = useTelegram()

    const [addStarsClick, { data: addStarsData, isLoading: isAddStarsLoading, error: isAddStarsError}] = useAddStarsMutation()

    const { scrollTop } = useScroll()
    const location = useLocation()

    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
        hideTgButton()
        setIsWithDraw(false)
        handleMainButtonClick(addStarsHandler())
    }, [])

    const handlePickStarAmount = (val) => {
        if (pickedVal !== val) {
            setPickedVal(val)
        } else {
            setPickedVal(0)
        }
    }

    const addStarsHandler = async () => {
        if (!isAddStarsLoading) {
            await addStarsClick({
                tg_id: tgUser | 658318611,
                amount: pickedVal,
                type: 'DEF',
                a_type: 'A' 
            })
            dispatch(resetBonus())
        }
    }

    useEffect(() => {
        if (pickedVal > 0 && mainBalance < 10) {
            showTgButton(`ADD ${pickedVal} Stars`)
        } else {
            hideTgButton()
        }
    }, [pickedVal, mainBalance])

    useEffect(() => {
        if (!isAddStarsLoading && addStarsData) {
            isAddStarsError ? sendAlert('Произошла ошибка при пополнении баланса') : sendAlert(`Баланс успешно пополнен на \n${addStarsData.amount} Stars`)
        }
    }, [isAddStarsLoading]) 
    return (
        <div className="addstars-page">

            <div className="addstars-page__game">
                <AddStarsGame 
                    pickedAddStarValue={pickedVal}
                />
            </div>


            <div className="addstars-page__content">
                {starVars.map(starItem => (
                    <div key={starItem.id} className={"addstars-item" + (starItem.val === pickedVal ? ' _active' : '')} onClick={() => handlePickStarAmount(starItem.val)}>
                        {starItem.val} stars
                    </div>
                ))}
            </div>
            {/* <RequestButton
                onClick={addStarsHandler}
                isloading={isAddStarsLoading}
                disabled={pickedVal === 0}
            >Пополнить</RequestButton> */}
        </div>
    )
};

export default AddStars
