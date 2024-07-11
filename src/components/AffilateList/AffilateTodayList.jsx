import React, { useEffect, useState } from 'react';
import BoxWrapper from '../Wrappers/BoxWrapper';
import AffilateItem from './AffilateItems/AffilateItem';
import { useApp } from '../../hooks/useApp';

const transactions = [
    {id: 1, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: 'Today', partnerProfit: 50000, partnerAmount: 348},
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 5000, profit: 25000, date: 'Today'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: 'Today'},
]
const transactionsPremium = [
    {id: 1, type: 'game', status: 'completed', amount: 5000, peopleAmount: 45, fee: 2000, profit: 25000, date: 'Today', partnerProfit: 50000, partnerAmount: 348},
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 5000, profit: 25, date: 'Today'},
    {id: 1, type: 'withdrawUsdt', status: 'pending', amount: 25.50, date: 'Today'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: 'Today'},
]

const defGameObj = {
    id: 1, 
    type: 'game', 
    fee: 0, 
    profit: 0, 
    date: 'Today', 
    partnerProfit: 0, 
    partnerAmount: 0
}

const AffilateTodayList = ({
    refData = null
}) => {
    const {isPremium} = useApp()
    const [trans, setTrans] = useState([])
    const tonRate = 0.00126917

    useEffect(() => {
        if (isPremium) {
            setTrans(transactionsPremium)
        }
    }, [isPremium])

    useEffect(() => {
        if (refData !== null) {
            let gamesObj, addSObj
            let refGames = Object.keys(refData.todayGames).length ? refData.todayGames : null
            let refAddStars = Object.keys(refData.todayAddStars).length ? refData.todayAddStars : null
            if (refGames !== null) {
                gamesObj = {
                    id: 1, 
                    type: 'game', 
                    fee: refGames.totalServiceFee, 
                    profit: refGames.totalPartnerProfit, 
                    date: 'Today', 
                    partnerProfit: refGames.referralsTotal, 
                    partnerAmount: refGames.referralsCount
                }
            } else {
                gamesObj = defGameObj
            }
            if (refAddStars !== null) {
                addSObj = {id: 1, type: 'add', amount: refAddStars.totalSum, profit: refAddStars.airdrop, date: 'Today'}
            } else {
                addSObj = {id: 1, type: 'add', status: 'completed', amount: 0, peopleAmount: 0, fee: 0, profit: 0, date: 'Today'}
            }
            setTrans([gamesObj, addSObj])
        }
    }, [refData])

    if (!refData?.todayGames || !refData?.todayAddStars) {
        return (
            <BoxWrapper className={'history-list list-affilate partner-todaylist'}>
                История пустая
            </BoxWrapper>
        )
    }
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