import React from "react"
import AffilateItemWithdraw from "./AffilateItemWithdraw";
import AffilateItemAdd from "./AffilateItemAdd";
import AffilateItemAddPartnership from "./AffilateItemAddPartnership";
import AffilateItemSwap from "./AffilateItemSwap";
import AffilateItemWithdrawUsdt from "./AffilateItemWithdrawUsdt";

const AffilateItem= ({
    affilateItem,
    tonRate
}) => {
    function formatDate(dateString, type='def') {
        const date = new Date(dateString);
      
        // Извлечение нужных частей даты
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        if (type === 'dayOnly') {
            return `${day.toString().padStart(2, '0')} ${month} ${year}`;
        }
        
      
        // Формирование строки в нужном формате
        return `${day.toString().padStart(2, '0')} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    switch (affilateItem.type) {
        case 'withdraw':
            return <AffilateItemWithdraw tonRate={tonRate} withdrawData={{...affilateItem, date:affilateItem.date !== 'Today' ? formatDate(affilateItem.date) : affilateItem.date}} />
            
        case 'add':
            return <AffilateItemAdd addStarsData={affilateItem} />
            
        case 'game':
            return <AffilateItemAddPartnership addStarsData={affilateItem} />
        case 'swap':
            return <AffilateItemSwap swapData={affilateItem} />

        case 'withdrawUsdt':
            return <AffilateItemWithdrawUsdt withdrawData={{...affilateItem, date:affilateItem.date !== 'Today' ? formatDate(affilateItem.date) : affilateItem.date}} />
            
        default:
            return null;
    }
};

export default AffilateItem
