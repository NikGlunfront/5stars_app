import React from "react"
import BoxWrapper from "../Wrappers/BoxWrapper";
import HistoryItem from "./HistoryItems/HistoryItem";

const games = [
    {id: 1, type: 'game', bets: [1, 3, 5], betAmount: 10, winNumber: 5, gameResult: 50, fee: 1, date: '11 june 15:40'},
    {id: 2, type: 'game', bets: [1], betAmount: 10, winNumber: 4, gameResult: 0, fee: 1, date: '11 june 15:40'},
    {id: 1, type: 'add', amount: 250, date: '11 june 15:40'},
    {id: 1, type: 'withdraw', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'game', bets: [1, 3, 5], betAmount: 500, winNumber: 5, gameResult: 2500, fee: 50, date: '11 june 15:40'},
    {id: 4, type: 'game', bets: [1, 3, 5], betAmount: 10, winNumber: 4, gameResult: 0, fee: 1, date: '11 june 15:40'},
    {id: 2, type: 'add', amount: 250, date: '11 june 15:40'},
    {id: 2, type: 'withdraw', amount: 2000, date: '11 june 15:40'},
    {id: 5, type: 'game', bets: [1, 3, 5], betAmount: 100, winNumber: 5, gameResult: 500, fee: 10, date: '11 june 15:40'},
]

const HistoryList= ({

}) => {
    const tonRate = 0.00126917
    return (
        <BoxWrapper className={'history-list'}>
            {games.map(historyItem => (
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
