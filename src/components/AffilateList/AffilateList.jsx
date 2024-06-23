import React from "react"
import BoxWrapper from "../Wrappers/BoxWrapper";
import AffilateItem from "./AffilateItems/AffilateItem";

const transactions = [
    {id: 1, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 20, date: '11 june 15:40'},
    {id: 1, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 2, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 20, date: '11 june 15:40'},
    {id: 2, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
    {id: 3, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 20, date: '11 june 15:40'},
    {id: 3, type: 'withdraw', status: 'pending', amount: 2000, date: '11 june 15:40'},
    {id: 4, type: 'add', status: 'completed', amount: 5000, peopleAmount: 45, fee: 100, profit: 20, date: '11 june 15:40'},
    {id: 4, type: 'withdraw', status: 'completed', amount: 2000, date: '11 june 15:40'},
]

const AffilateList= ({

}) => {
    const tonRate = 0.00126917
    return (
        <BoxWrapper className={'history-list list-affilate'}>
            {transactions.map(affilateItem => (
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
