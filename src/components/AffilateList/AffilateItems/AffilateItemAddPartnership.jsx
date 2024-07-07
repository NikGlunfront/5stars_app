import React from "react"
import { useApp } from "../../../hooks/useApp";

const AffilateItemAddPartnership= ({
    addStarsData
}) => {
    const {
        date,
        amount,
        profit,
        partnerAmount = 0,
        partnerProfit = 0,
        fee
    } = addStarsData
    const {isPremium} = useApp()
    return (
        <div className="history-item history-item_addpartners">
            <div className={"history-item__img"}>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18.5" cy="18.5" r="18.5" fill="#FFF1CD"/>
                    <path d="M27.0322 26.9995C27.5842 26.9817 28.0173 26.5198 27.9995 25.9678L27.7093 16.9724C27.6915 16.4204 27.2296 15.9874 26.6776 16.0052C26.1256 16.023 25.6925 16.4849 25.7103 17.0369L25.9683 25.0328L17.9724 25.2907C17.4204 25.3085 16.9874 25.7704 17.0052 26.3224C17.023 26.8744 17.4849 27.3075 18.0369 27.2897L27.0322 26.9995ZM10.3161 11.7295L26.3161 26.7295L27.6839 25.2705L11.6839 10.2705L10.3161 11.7295Z" fill="#FF8E03"/>
                </svg>
            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        <div className="addpartners-row">
                            <div>
                                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 5.5C7.01892 5.5 8.25 4.26892 8.25 2.75C8.25 1.23108 7.01892 0 5.5 0C3.98108 0 2.75 1.23108 2.75 2.75C2.75 4.26892 3.98108 5.5 5.5 5.5ZM5.5 5.5C2.46217 5.5 0 7.0455 0 10.0833C0 13.75 11 13.75 11 10.0833C11 7.0455 8.53783 5.5 5.5 5.5Z" fill="#2CAFFD"/>
                                </svg>
                                <span>
                                    {(partnerAmount).toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.41961 0.973017C6.696 0.384523 7.52997 0.384524 7.80636 0.973018L9.25517 4.05782C9.3666 4.29507 9.59073 4.45901 9.84985 4.49278L13.2115 4.93091C13.8516 5.01434 14.1087 5.80606 13.6406 6.25218L11.1708 8.6057C10.9823 8.78536 10.8973 9.04869 10.9451 9.30521L11.5715 12.67C11.6904 13.3086 11.0163 13.7986 10.4491 13.486L7.48191 11.8506C7.25214 11.724 6.97383 11.724 6.74406 11.8506L3.7769 13.486C3.20966 13.7986 2.53556 13.3086 2.65445 12.67C2.84382 11.6383 2.98615 10.7495 3.24168 10.151C3.96567 9.08218 7.84116 7.67134 7.66665 7.44864C7.7134 7.24381 3.1565 8.26988 2.38992 7.84235L1.96404 7.58583L0.585408 6.25218C0.11726 5.80606 0.374368 5.01434 1.01448 4.93091L4.37612 4.49278C4.63524 4.45901 4.85937 4.29507 4.9708 4.05782L6.41961 0.973017Z" fill="#FF9306"/>
                                </svg>
                                <span>
                                    {(partnerProfit).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    {isPremium 
                        ?
                        <div className="history-item__changes">
                            <div className="history-item__benefits">
                                <div className="history-game-result-coin _active"></div>
                                <span>{fee.toLocaleString()}</span>
                            </div>
                        </div>
                        :
                        <div className="history-item__changes">
                            <div className="history-item__benefits">
                                <div className="history-game-result-star _active"></div>
                                <span>{fee.toLocaleString()}</span>
                            </div>
                            <div className="history-item__affilate-profit">
                                <div className="history-game-result-star _active _win _green"></div>
                                <span>1000</span>
                                <div>Yours 50%</div>
                            </div>
                        </div>
                    }
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    <div className={(isPremium ? "history-item__win _coin" : 'history-item__win _green')}>+{profit.toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
};

export default AffilateItemAddPartnership
