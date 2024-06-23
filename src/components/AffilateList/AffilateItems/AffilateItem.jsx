import React from "react"
import AffilateItemWithdraw from "./AffilateItemWithdraw";
import AffilateItemAdd from "./AffilateItemAdd";

const AffilateItem= ({
    affilateItem,
    tonRate
}) => {
    switch (affilateItem.type) {
        case 'withdraw':
            return <AffilateItemWithdraw tonRate={tonRate} withdrawData={affilateItem} />
            
    
        case 'add':
            return <AffilateItemAdd addStarsData={affilateItem} />
            
    
        default:
            return null;
    }
};

export default AffilateItem
