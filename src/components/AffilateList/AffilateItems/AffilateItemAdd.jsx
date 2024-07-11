import React from "react"
import { useApp } from "../../../hooks/useApp";

const AffilateItemAdd= ({
    addStarsData
}) => {
    const {isPremium} = useApp()
    const {
        date,
        amount,
        profit,
    } = addStarsData
    return (
        <div className="history-item history-item_add">
            <div className={"history-item__img"}>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18.5" cy="18.5" r="18.5" fill="#E9FBEE"/>
                    <path d="M27.0322 26.9995C27.5842 26.9817 28.0173 26.5198 27.9995 25.9678L27.7093 16.9724C27.6915 16.4204 27.2296 15.9874 26.6776 16.0052C26.1256 16.023 25.6925 16.4849 25.7103 17.0369L25.9683 25.0328L17.9724 25.2907C17.4204 25.3085 16.9874 25.7704 17.0052 26.3224C17.023 26.8744 17.4849 27.3075 18.0369 27.2897L27.0322 26.9995ZM10.3161 11.7295L26.3161 26.7295L27.6839 25.2705L11.6839 10.2705L10.3161 11.7295Z" fill="#5CCC9D"/>
                </svg>
            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        Income
                    </div>
                    {isPremium
                        ?
                        <div className="history-item__changes">
                            <div className="history-item__benefits">
                                <div className="history-game-result-star _active _win"></div>
                                <span>{amount.toLocaleString()}</span>
                            </div>
                            <div className="history-item__affilate-profit">
                                <div className="history-game-result-star _active _win _green"></div>
                                <span>{(profit).toLocaleString()}</span>
                                <div>Yours 50%</div>
                            </div>
                        </div>
                        :
                        <div className="history-item__changes">
                            <div className="history-item__benefits">
                                <div className="history-game-result-star _active _win"></div>
                                <span>{amount.toLocaleString()}</span>
                            </div>
                            <div className="history-item__affilate-profit">
                                <div className="history-game-result-coin _active _win"></div>
                                <span>{(profit).toLocaleString()}</span>
                                <div>Airdrop</div>
                            </div>
                        </div>
                    }
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    <div className={"history-item__win _coin" + (isPremium ? " _usdt" : '')}>
                        +{profit.toLocaleString()}
                        {isPremium &&
                            <div className="history-item__airdrop">1 Star = $0.005</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AffilateItemAdd
