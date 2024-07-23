import React, { useEffect, useState } from "react"
import { useTelegram } from "../../../hooks/useTelegram";
import { useGetAllHistoryGamesQuery, useGetHistoryTotalsQuery } from "../../../store/services/starsGame";

const TitleHistory= ({}) => {
    const [globalHistoryData, setGlobalHistoryData] = useState({
        bets: 0,
        profit: 0,
        airdrop: 0
    })

    const {user: tgUser} = useTelegram()
    const {data: historyGamesData, isLoading: isHistoryGamesLoading, isError: isHistoryGamesError, refetch} = useGetHistoryTotalsQuery(tgUser)


    const updateGlobalItems = (alLItems) => {
        setGlobalHistoryData({
            bets: parseInt(alLItems.bet_sum) | 0,
            profit: parseInt(alLItems.win_sum) | 0,
            airdrop: parseInt(alLItems.air_sum) | 0
        })
    }

    useEffect(() => {
        if (!isHistoryGamesLoading && historyGamesData) {
            updateGlobalItems(historyGamesData)
        }
    }, [historyGamesData, isHistoryGamesLoading])

    return (
        <div className="title-history">
            <div className="intro-star-topper__subtitle">Airdrop</div>
            {/* <div className="title-affilate__text">
                To know how this program works and how to increase your cut up to 
                <span>50%</span> 
                please 
                <div>read this rules</div>.
            </div> */}
            <div className="title-history__stars">
                <div><div className="title-history__starimg"></div>{globalHistoryData.bets}</div>
                <div><div className="title-history__starimg"></div>{globalHistoryData.profit}</div>
                <div><div className="title-history__starimg"></div>{globalHistoryData.airdrop}</div>
            </div>
            <div className="title-history__ton_btn">Connect TON Space</div>
        </div>
    )
};

export default TitleHistory
