import React from "react"
import HistoryWithdrawItem from "./HistoryWithdrawItem";
import HistoryGameResult from "./HistoryGameResult";
import HistoryItemAddStars from "./HistoryItemAddStars";

const HistoryItem= ({
    historyItem,
    tonRate
}) => {
    switch (historyItem.type) {
        case 'game':
            return <HistoryGameResult gameData={historyItem} />
            
    
        case 'withdraw':
            return <HistoryWithdrawItem tonRate={tonRate} withdrawData={historyItem} />
            
    
        case 'add':
            return <HistoryItemAddStars addStarsData={historyItem} />
            
    
        default:
            return null;
    }
};

export default HistoryItem
