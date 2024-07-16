import React from "react"
import HistoryWithdrawItem from "./HistoryWithdrawItem";
import HistoryGameResult from "./HistoryGameResult";
import HistoryItemAddStars from "./HistoryItemAddStars";
import HistoryItemSwap from "./HistoryItemSwap";

const HistoryItem= ({
    historyItem,
    tonRate
}) => {
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
    switch (historyItem.type) {
        case 'game':
            return <HistoryGameResult gameData={{...historyItem, date: formatDate(historyItem.date)}} />
            
    
        case 'withdraw':
            return <HistoryWithdrawItem tonRate={tonRate} withdrawData={{...historyItem, date: formatDate(historyItem.date)}} />
            
    
        case 'A':
            return <HistoryItemAddStars addStarsData={historyItem} />
            
        case 'P':
            return <HistoryItemAddStars addStarsData={historyItem} isPrize={true} />
            
    
        case 'S':
            return <HistoryItemSwap swapData={{...historyItem, created: formatDate(historyItem.created)}} />
            
    
        default:
            return null;
    }
};

export default HistoryItem
