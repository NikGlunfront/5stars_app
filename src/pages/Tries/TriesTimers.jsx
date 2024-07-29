import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import timerIco from '../../assets/img/icons/bonus_timer.png';
import { useInterval } from "../../hooks/useInterval";
import { useTelegram } from "../../hooks/useTelegram";
import { useGetAttemptsQuery } from "../../store/services/starsGame";
import { setIsVisibleBonus } from "../../store/slices/addStarSlice/addStarSlice";

const TriesTimers = ({
    activeTime,
    expired = false
}) => {
    const [timerTime, setTimerTime] = useState(0)
    const { user: tgUser } = useTelegram()
    const dispatch = useDispatch()
    const { isVisibleBonus } = useSelector(state => state.addStar)
    const {data: bonusData, isLoading: isBonusDataLoading, refetch: refetchBonus} = useGetAttemptsQuery(tgUser)

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
        } else {
        }
    }, [activeTime])
    
    useEffect(() => {
        if (timerTime === 0) {
            setTimeout(() => {
                refetchBonus()
            }, 1500);
        }
    }, [timerTime])

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
            <img src={timerIco} alt="" />
            {timerTime === 0
                ? "00:00"
                : <span>{Math.floor(timerTime / 60) > 9 ? Math.floor(timerTime / 60) : `0${Math.floor(timerTime / 60)}`}:{timerTime % 60 > 9 ? timerTime % 60 : `0${timerTime % 60}`}</span>
            }
        </div>
    )
};

export default TriesTimers;
