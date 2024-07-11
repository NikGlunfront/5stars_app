import React, { useEffect, useState } from "react"
import BoxWrapper from "../Wrappers/BoxWrapper";
import AffilateItem from "./AffilateItems/AffilateItem";
import { useApp } from "../../hooks/useApp";

const transactions = [
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 1, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 1, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 2, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 2, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 2, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 3, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 3, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 3, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 4, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 4, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
]
const transactionsPremium = [
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 1, type: 'withdrawUsdt', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 1, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 1, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 2, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 2, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'withdrawUsdt', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 2, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 3, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 3, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'withdrawUsdt', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 3, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 4, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 4, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
]

const AffilateList= ({
    refData
}) => {
    const tonRate = 0.00126917
    const {isPremium} = useApp()
    const [trans, setTrans] = useState(transactions)

    useEffect(() => {
        if (isPremium) {
            setTrans(transactionsPremium)
        }
    }, [isPremium])

    function formatDate(dateString, type='def') {
        const date = new Date(dateString);
      
        // Извлечение нужных частей даты
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if (type === 'dayOnly') {
            return `${day.toString().padStart(2, '0')} ${month} ${year}`;
        }
        
      
        // Формирование строки в нужном формате
        return `${day.toString().padStart(2, '0')} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const getGameObjView = (obj) => {
        return {
            id: obj.type + obj.created, 
            type: 'game', 
            fee: parseInt(obj.fee_sum), 
            profit: parseInt(obj.fee_sum) / 2, 
            date: formatDate(obj.created, 'dayOnly'), 
            partnerProfit: parseInt(obj.act_value_sum), 
            partnerAmount: parseInt(obj.uniq_user_ids_amount)
        }
    }

    const getIncomeObjView = (obj) => {
        if (obj.user_id) {
            console.log(obj)
        }
        return {id: obj.id, type: 'add',  amount: parseInt(obj.act_value),  profit: parseInt(obj.act_value), date: formatDate(obj.created)}
    }

    const handleObjectView = (obj) => {
        switch (obj.type) {
            case 'game':
                return getGameObjView(obj)
                break;
        
            case 'add':
                return getIncomeObjView(obj)
                break;
        
            default:
                return obj
                break;
        }
    }
    
    useEffect(() => {
        if (refData) {
            setTrans([...refData])
        }
    }, [refData])

    if (!refData?.length) {
        return (
            <BoxWrapper className={'history-list list-affilate partner-todaylist'}>
                <p className="history-list__empty">История пустая</p>
            </BoxWrapper>
        )
    }
    return (
        <BoxWrapper className={'history-list list-affilate'}>
            {trans.map(affilateItem => (
                <AffilateItem 
                    affilateItem={handleObjectView(affilateItem)}
                    tonRate={tonRate}
                    key={`${affilateItem.type}_${affilateItem.id}`}
                />
            ))}
        </BoxWrapper>
    )
};

export default AffilateList
