import React, { useEffect, useState } from 'react';
import BoxWrapper from '../Wrappers/BoxWrapper';
import AffilateItem from './AffilateItems/AffilateItem';
import { useApp } from '../../hooks/useApp';

const transactions = [
    {id: 1, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: 'Today', partnerProfit: 50000, partnerAmount: 348},
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 5000, profit: 25000, date: 'Today'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: 'Today'},
]
const transactionsPremium = [
    {id: 1, type: 'addPartner', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: 'Today', partnerProfit: 50000, partnerAmount: 348},
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 5000, profit: 25, date: 'Today'},
    {id: 1, type: 'withdrawUsdt', status: 'pending', amount: 25.50, date: 'Today'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: 'Today'},
]

const AffilateTodayList = () => {
    const {isPremium} = useApp()
    const [trans, setTrans] = useState(transactions)

    useEffect(() => {
        if (isPremium) {
            setTrans(transactionsPremium)
        }
    }, [isPremium])
    const tonRate = 0.00126917
    return (
        <BoxWrapper className={'history-list list-affilate partner-todaylist'}>
            {trans.map(affilateItem => (
                <AffilateItem 
                    affilateItem={affilateItem}
                    tonRate={tonRate}
                    key={`${affilateItem.type}_${affilateItem.id}`}
                />
            ))}
        </BoxWrapper>
    );
};

export default AffilateTodayList;