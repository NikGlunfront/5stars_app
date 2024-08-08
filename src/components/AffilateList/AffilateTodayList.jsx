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
                withdObj = {...defWithDraw, amount: refData.todayWd?.sum_lst ? refData.todayWd.sum_lst : 0}
                withdPendingObj = {...defWithDrawPending, amount: refData.todayWdPending?.sum_lst_pending ? refData.todayWdPending.sum_lst_pending : 0}
                let minusObject = []
                if (swapObj.amount > 0) {
                    minusObject = [...minusObject, swapObj]
                }
                if (withdObj.amount > 0) {
                    minusObject = [...minusObject, withdObj]
                }
                if (withdPendingObj.amount > 0) {
                    minusObject = [...minusObject, withdPendingObj]
                }
                setTrans([gamesObj, addSObj, ...minusObject])
            } else {
                withdObj = {...defWithDraw, amount: refData.todayWd?.sum_lst ? refData.todayWd.sum_lst : 0}
                withdPendingObj = {...defWithDrawPending, amount: refData.todayWdPending?.sum_lst_pending ? refData.todayWdPending.sum_lst_pending : 0}
                withUsdtObj = {...defWithDrawUsdt, amount: refData.todayWd?.sum_usdt ? refData.todayWd.sum_usdt : 0}
                withUsdtPendingObj = {...defWithDrawUsdtPending, amount: refData.todayWdPending?.sum_usdt_pending ? refData.todayWdPending.sum_usdt_pending : 0}
                console.log(withUsdtObj, withUsdtPendingObj)
                let minusObject = []
                if (withdObj.amount > 0) {
                    minusObject = [...minusObject, withdObj]
                }
                if (withdPendingObj.amount > 0) {
                    minusObject = [...minusObject, withdPendingObj]
                }
                if (withUsdtObj.amount > 0) {
                    minusObject = [...minusObject, withUsdtObj]
                }
                if (withUsdtPendingObj.amount > 0) {
                    minusObject = [...minusObject, withUsdtPendingObj]
                }
                setTrans([gamesObj, addSObj, ...minusObject])
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