import React from "react"

const HistoryItemTries= ({
    tries,
}) => {
    const {
        amount,
        date
    } = tries
    return (
        <div className="history-item history-item_add">
            <div className={"history-item__img"}>
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.71142 5.71142C13.3266 -1.90381 25.6734 -1.90381 33.2886 5.71142C40.9038 13.3266 40.9038 25.6734 33.2886 33.2886C25.6734 40.9038 13.3266 40.9038 5.71142 33.2886C-1.90381 25.6734 -1.90381 13.3266 5.71142 5.71142Z" fill="#DCECFF"/>
                    <path d="M12.8404 10.633C14.358 9.46728 16.1644 8.73665 18.0657 8.51949C19.967 8.30232 21.8916 8.60682 23.633 9.40032C25.3744 10.1938 26.867 11.4464 27.9506 13.0237C29.0343 14.601 29.6681 16.4435 29.7842 18.3537C29.9002 20.2638 29.4941 22.1696 28.6094 23.8665C27.7247 25.5634 26.3948 26.9874 24.7623 27.9859C23.1297 28.9844 21.2562 29.5197 19.3426 29.5343C17.4289 29.549 15.5474 29.0424 13.8998 28.069C9.33513 25.3678 7.4446 19.7372 9.54105 14.8641" stroke="#1773E6" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.35391 18.9948L9.0127 14.336L13.6715 18.9948" stroke="#1773E6" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        Add tries
                    </div>
                    <div className="history-item__changes">
                        <div className="history-item__spend">
                            <div className={"history-game-result-try _active _win" }></div>
                            {(50).toLocaleString()} {tries.bonus_type === 'P' ? " Prize" : ''}
                        </div>
                        {tries.bonus_type === 'B' &&
                        <div className="history-item__affilate-profit " style={{marginRight:"0.6rem"}}>
                            <div className="history-game-result-try _active _win"></div>
                            <span>{(amount - 50).toLocaleString()} Bonus</span>
                        </div>
                        }
                        {/* {tries.bonus_type !== 'P' &&
                        <div className="history-item__affilate-profit ">
                            <div className="history-game-result-star _active _win"></div>
                            <span>{100}</span>
                        </div>
                        } */}
                    </div>
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    <div className="history-item__win _tries">+{amount.toLocaleString()}</div>
                    <div className="history-item__tgstar">{(100).toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
};

export default HistoryItemTries
