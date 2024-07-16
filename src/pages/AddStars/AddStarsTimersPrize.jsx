import React, { useEffect, useState } from "react"
import { useInterval } from "../../hooks/useInterval";
import { useDispatch, useSelector } from "react-redux";
import { setIsVisibleBonus } from "../../store/slices/addStarSlice/addStarSlice";

const AddStarsTimersPrize = ({
    activeTime,
    expired = false
}) => {
    const [timerTime, setTimerTime] = useState(0)
    const dispatch = useDispatch()
    const { isVisibleBonus } = useSelector(state => state.addStar)

    function getDaysDifference(dateString) {
        // Преобразуем строку в объект Date
        const targetDate = new Date(dateString); 
        targetDate.setHours(targetDate.getHours() + 2);
        targetDate.setMinutes(targetDate.getMinutes() + 10);
      
        // Получаем текущую дату
        const currentDate = new Date();
      
        // Вычисляем разницу в миллисекундах
        const secondsDifference = (targetDate - currentDate) / 1000;
      
        // Возвращаем результат округленным до целых
        return Math.round(secondsDifference);
    }

    useEffect(() => {
        const timeDiff = getDaysDifference(activeTime)
        if (timeDiff > 0) {
            setTimerTime(timeDiff)
        }
    }, [activeTime])

    useInterval(() => {
        if (timerTime > 0) {
            setTimerTime(timerTime - 1)
            if (!isVisibleBonus) {
                dispatch(setIsVisibleBonus(true))
            }
        }
    }, 1000)

    return (
        <div className="add-star-game__timer">
            {timerTime === 0
                ? "Expired"
                : <span>{Math.floor(timerTime / 60) > 9 ? Math.floor(timerTime / 60) : `0${Math.floor(timerTime / 60)}`}:{timerTime % 60 > 9 ? timerTime % 60 : `0${timerTime % 60}`}</span>
            }
        </div>
    )
};

export default AddStarsTimersPrize;
