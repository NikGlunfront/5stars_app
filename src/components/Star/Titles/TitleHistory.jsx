import React, { useEffect, useState } from "react"
import { useTelegram } from "../../../hooks/useTelegram";
import { useGetAllHistoryGamesQuery } from "../../../store/services/starsGame";

const TitleHistory= ({}) => {
    const [globalHistoryData, setGlobalHistoryData] = useState({
        bets: 0,
        profit: 0,
        airdrop: 0
    })

    const {user: tgUser} = useTelegram()
    const {data: historyGamesData, isLoading: isHistoryGamesLoading, isError: isHistoryGamesError, refetch} = useGetAllHistoryGamesQuery(tgUser | 658318611)


    const updateGlobalItems = (alLItems) => {
        let betsTotal = 0;
        let profitTotal = 0;
        let airdropTotal = 0;
        for (let i = 0; i < alLItems.length; i++) {
            const historyItem = alLItems[i];
            if (historyItem.type === 'game') {
                betsTotal += parseInt(historyItem.betAmount) * historyItem.bets.length
                airdropTotal += parseInt(historyItem.is_success) ? (parseInt(historyItem.betAmount) * 5 - parseInt(historyItem.betAmount) * historyItem.bets.length) + parseInt(historyItem.betAmount) * historyItem.bets.length : parseInt(historyItem.betAmount) * historyItem.bets.length
                profitTotal += parseInt(historyItem.is_success) ? parseInt(historyItem.betAmount) * 5 - (parseInt(historyItem.betAmount) * historyItem.bets.length) : 0
            }
        }
        setGlobalHistoryData({
            bets: betsTotal,
            profit: profitTotal,
            airdrop: airdropTotal
        })
    }

    useEffect(() => {
        if (!isHistoryGamesLoading && historyGamesData?.length) {
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
