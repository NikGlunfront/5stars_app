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
const defSwapObj = {id: 1, type: 'swap',  amount: 0, date: 'Today'}

const defWithDraw = {id: 1, type: 'withdraw', status: 'completed', amount: 0, date: 'Today'}
const defWithDrawUsdt = {id: 2, type: 'withdrawUsdt', status: 'completed', amount: 0, date: 'Today'}
const defWithDrawPending = {id: 3, type: 'withdraw', status: 'pending', amount: 0, date: 'Today'}
const defWithDrawUsdtPending = {id: 4, type: 'withdrawUsdt', status: 'pending', amount: 0, date: 'Today'}

const AffilateTodayList = ({
    refData = null
}) => {
    const {isPremium} = useApp()
    const [trans, setTrans] = useState([])
    const tonRate = 0.00126917

    useEffect(() => {
        if (refData !== null) {
            let gamesObj, addSObj, swapObj, withdObj, withUsdtObj, withdPendingObj, withUsdtPendingObj
            let refGames = Object.keys(refData.todayGames).length ? refData.todayGames : null
            let refAddStars = Object.keys(refData.todayAddStars).length ? refData.todayAddStars : null
            if (refGames !== null) {
                gamesObj = 
                    isPremium 
                    ? {id: 1, type: 'game', fee: refGames.referralsTotal, profit: refGames.referralsTotal, date: 'Today', partnerProfit: refGames.referralsTotal, partnerAmount: refGames.referralsCount}
                    : {id: 1, type: 'game', fee: refGames.totalServiceFee, profit: refGames.totalPartnerProfit, date: 'Today', partnerProfit: refGames.referralsTotal, partnerAmount: refGames.referralsCount}
            } else {
                gamesObj = defGameObj
            }
            if (refAddStars !== null) {
                addSObj = 
                isPremium 
                    ? {id: 1, type: 'add', amount: refAddStars.totalSum, profit: refAddStars.totalSum / 2, date: 'Today'}
                    : {id: 1, type: 'add', amount: refAddStars.totalSum, profit: refAddStars.airdrop / 2, date: 'Today'}
                    
            } else {
                addSObj = {id: 1, type: 'add', status: 'completed', amount: 0, peopleAmount: 0, fee: 0, profit: 0, date: 'Today'}
            }
            if (!isPremium) {
                swapObj = {id: 1, type: 'swap',  amount: refData.todaySwap.swap_sum ? parseInt(refData.todaySwap.swap_sum) : 0, date: 'Today'}
                withdObj = defWithDraw
                withdPendingObj = defWithDrawPending
                setTrans([gamesObj, addSObj, swapObj, withdObj, withdPendingObj])
            } else {
                withdObj = defWithDraw
                withdPendingObj = defWithDrawPending
                withUsdtObj = defWithDrawUsdt
                withUsdtPendingObj = defWithDrawUsdtPending
                setTrans([gamesObj, addSObj, withdObj, withdPendingObj, withUsdtObj, withUsdtPendingObj])
            }
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