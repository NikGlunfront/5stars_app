import React, { useEffect, useState } from "react"
import BoxWrapper from "../Wrappers/BoxWrapper";
import HistoryItem from "./HistoryItems/HistoryItem";
import { useGetAllHistoryGamesQuery } from "../../store/services/starsGame";
import { useTelegram } from "../../hooks/useTelegram";

const games = [
    {id: 1, type: 'game', bets: [1, 3, 5], betAmount: 10, winNumber: 5, gameResult: 50, fee: 1, date: '2024-07-08 11:44:46'},
    {id: 2, type: 'game', bets: [1], betAmount: 10, winNumber: 4, gameResult: 0, fee: 1, date: '2024-07-08 11:44:46'},
    {id: 1, type: 'add', amount: 250, date: '2024-07-08 11:44:46'},
    {id: 1, type: 'withdraw', amount: 2000, date: '2024-07-08 11:44:46'},
    {id: 3, type: 'game', bets: [1, 3, 5], betAmount: 500, winNumber: 5, gameResult: 2500, fee: 50, date: '2024-07-08 11:44:46'},
    {id: 4, type: 'game', bets: [1, 3, 5], betAmount: 10, winNumber: 4, gameResult: 0, fee: 1, date: '2024-07-08 11:44:46'},
    {id: 2, type: 'add', amount: 250, date: '2024-07-08 11:44:46'},
    {id: 2, type: 'withdraw', amount: 2000, date: '2024-07-08 11:44:46'},
    {id: 5, type: 'game', bets: [1, 3, 5], betAmount: 100, winNumber: 5, gameResult: 500, fee: 10, date: '2024-07-08 11:44:46'},
]

const HistoryList= ({

}) => {
    const [listItems, setListItems] = useState([])
    const [globalHistoryData, setGlobalHistoryData] = useState({
        bets: 0,
        profit: 0,
        airdrop: 0
    })
    const {user: tgUser} = useTelegram()
    const {data: historyGamesData, isLoading: isHistoryGamesLoading, isError: isHistoryGamesError} = useGetAllHistoryGamesQuery(tgUser | 658318611)

    const updateGlobalItems = (alLItems) => {
        let betsTotal = 0;
        let profitTotal = 0;
        let airdropTotal = 0;
        for (let i = 0; i < alLItems.length; i++) {
            const historyItem = alLItems[i];
            betsTotal += parseInt(historyItem.bet_amount) * historyItem.picked_stars.length
        }
        setGlobalHistoryData({
            bets: betsTotal,
            profit: profitTotal,
            airdrop: airdropTotal
        })
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
      
        // Извлечение нужных частей даты
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        // Формирование строки в нужном формате
        return `${day.toString().padStart(2, '0')} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        if (!isHistoryGamesLoading && historyGamesData?.length) {
            console.log(historyGamesData)
            setListItems([...historyGamesData])
        }
    }, [historyGamesData, isHistoryGamesLoading])
    
    useEffect(() => {console.log(listItems)}, [listItems])

    if (!listItems.length) {
        return (<BoxWrapper className={'history-list'}><p className="history-list__empty">История пустая</p></BoxWrapper>)
    }

    const tonRate = 0.00126917
    return (
        <BoxWrapper className={'history-list'}>
            {listItems.map(historyItem => (
                <HistoryItem 
                    historyItem={historyItem}
                    tonRate={tonRate}
                    key={`${historyItem.type}_${historyItem.id}`}
                />
            ))}
        </BoxWrapper>
    )
};

export default HistoryList
