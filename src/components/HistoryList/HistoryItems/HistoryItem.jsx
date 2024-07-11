import React from "react"
import HistoryWithdrawItem from "./HistoryWithdrawItem";
import HistoryGameResult from "./HistoryGameResult";
import HistoryItemAddStars from "./HistoryItemAddStars";
import HistoryItemSwap from "./HistoryItemSwap";

const HistoryItem= ({
    historyItem,
    tonRate
}) => {
    switch (historyItem.type) {
        case 'game':
            return <HistoryGameResult gameData={historyItem} />
            
    
        case 'withdraw':
            return <HistoryWithdrawItem tonRate={tonRate} withdrawData={historyItem} />
            
    
        case 'A':
            return <HistoryItemAddStars addStarsData={historyItem} />
            
    
        case 'S':
            return <HistoryItemSwap swapData={historyItem} />
            
    
        default:
            return null;
    }
};

export default HistoryItem
