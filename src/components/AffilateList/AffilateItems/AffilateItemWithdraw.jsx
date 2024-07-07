import React from "react"

const AffilateItemWithdraw= ({
    withdrawData,
    tonRate
}) => {
    const {
        amount,
        date,
        status
    } = withdrawData
    return (
        <div className="history-item history-item_withdraw">
            <div className={"history-item__img" + (status === 'pending' ? " _pending" : '')}>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18.5" cy="18.5" r="18.5" transform="matrix(1 0 0 -1 0 37)" fill="#FFE8E8"/>
                    <path d="M27.0322 10.0005C27.5842 10.0183 28.0173 10.4802 27.9995 11.0322L27.7093 20.0276C27.6915 20.5796 27.2296 21.0126 26.6776 20.9948C26.1256 20.977 25.6925 20.5151 25.7103 19.9631L25.9683 11.9672L17.9724 11.7093C17.4204 11.6915 16.9874 11.2296 17.0052 10.6776C17.023 10.1256 17.4849 9.69254 18.0369 9.71035L27.0322 10.0005ZM10.3161 25.2705L26.3161 10.2705L27.6839 11.7295L11.6839 26.7295L10.3161 25.2705Z" fill="#CC5C5C"/>
                </svg>
            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        Withdraw LST
                        {status === 'pending' &&
                            <span className="pending-item">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6" cy="6" r="5.5" fill="#918F9C" stroke="#918F9C"/>
                                    <line x1="5.5" y1="3" x2="5.5" y2="7" stroke="white"/>
                                    <line x1="10" y1="6.5" x2="6" y2="6.5" stroke="white"/>
                                </svg>
                                Pending
                            </span>
                        }
                    </div>
                    <div className="history-item__changes">
                        <div className="history-item__spend">
                            <div className="history-game-result-coin _active _win"></div>
                            <span>{amount.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    <div className="history-item__lose">-{amount.toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
};

export default AffilateItemWithdraw
