import React, { useEffect, useState } from "react"
import BoxWrapper from "../Wrappers/BoxWrapper";
import AffilateItem from "./AffilateItems/AffilateItem";
import { useApp } from "../../hooks/useApp";

const transactions = [
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 1, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 1, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 2, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 2, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 2, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 3, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 3, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 3, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 4, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 4, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
]
const transactionsPremium = [
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 1, type: 'withdrawUsdt', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 1, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 1, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 2, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 2, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'withdrawUsdt', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 2, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 3, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 3, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'withdrawUsdt', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'swap', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25000, date: '11 june 15:40'},
    {id: 3, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: '11 june', partnerProfit: 50000, partnerAmount: 348},
    {id: 4, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 25, date: '11 june 15:40'},
    {id: 4, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
]

const AffilateList= ({

}) => {
    const tonRate = 0.00126917
    const {isPremium} = useApp()
    const [trans, setTrans] = useState(transactions)

    useEffect(() => {
        if (isPremium) {
            setTrans(transactionsPremium)
        }
    }, [isPremium])
    return (
        <BoxWrapper className={'history-list list-affilate'}>
            {trans.map(affilateItem => (
                <AffilateItem 
                    affilateItem={affilateItem}
                    tonRate={tonRate}
                    key={`${affilateItem.type}_${affilateItem.id}`}
                />
            ))}
        </BoxWrapper>
    )
};

export default AffilateList
