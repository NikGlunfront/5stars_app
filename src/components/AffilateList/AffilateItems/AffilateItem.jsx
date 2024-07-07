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
    switch (affilateItem.type) {
        case 'withdraw':
            return <AffilateItemWithdraw tonRate={tonRate} withdrawData={affilateItem} />
            
        case 'add':
            return <AffilateItemAdd addStarsData={affilateItem} />
            
        case 'addPartner':
            return <AffilateItemAddPartnership addStarsData={affilateItem} />
        case 'swap':
            return <AffilateItemSwap swapData={affilateItem} />

        case 'withdrawUsdt':
            return <AffilateItemWithdrawUsdt withdrawData={affilateItem} />
            
        default:
            return null;
    }
};

export default AffilateItem
