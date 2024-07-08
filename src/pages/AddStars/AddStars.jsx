import React, { useEffect } from "react"
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { useAddStarsMutation, useLazyAddStarsQuery } from "../../store/services/starsGame";
import { useTelegram } from "../../hooks/useTelegram";

const starVars = [
    {id: 1, val: 50, iconsCount: 1},
    {id: 2, val: 500, iconsCount: 6},
    {id: 3, val: 100, iconsCount: 2},
    {id: 4, val: 750, iconsCount: 7},
    {id: 5, val: 150, iconsCount: 3},
    {id: 6, val: 1000, iconsCount: 8},
    {id: 7, val: 250, iconsCount: 4},
    {id: 8, val: 1500, iconsCount: 9},
    {id: 9, val: 350, iconsCount: 5},
    {id: 10, val: 2500, iconsCount: 10},
]

const AddStars= ({

}) => {
    const {
        setIsWithDraw
    } = useApp()

    const { sendAlert, user: tgUser } = useTelegram()

    const [addStarsClick, { data: addStarsData, isLoading: isAddStarsLoading, error: isAddStarsError}] = useAddStarsMutation()

    const { scrollTop } = useScroll()
    const location = useLocation()

    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
        setIsWithDraw(false)
    }, [])

    const addStarsHandler = async (val) => {
        if (!isAddStarsLoading) {
            await addStarsClick({
                tg_id: tgUser | 658318611,
                amount: val,
                type: 'DEF',
                a_type: 'A' 
            })
        }
    }

    useEffect(() => {
        if (!isAddStarsLoading && addStarsData) {
            isAddStarsError ? sendAlert('Произошла ошибка при пополнении баланса') : sendAlert(`Баланс успешно пополнен на \n${addStarsData.amount} Stars`)
        }
    }, [isAddStarsLoading]) 
    return (
        <div className="addstars-page">
            <div className="addstars-page__content">
                {starVars.map(starItem => (
                    <div key={starItem.id} className="addstars-item" onClick={() => addStarsHandler(starItem.val)}>
                        {starItem.val} stars
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AddStars
