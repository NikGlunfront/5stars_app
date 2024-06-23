import React from "react"

const AffilateItemAdd= ({
    addStarsData
}) => {
    const {
        date,
        amount,
        profit,
        fee
    } = addStarsData
    return (
        <div className="history-item history-item_withdraw">
            <div className={"history-item__img"}>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18.5" cy="18.5" r="18.5" fill="#E9FBEE"/>
                    <path d="M27.0322 26.9995C27.5842 26.9817 28.0173 26.5198 27.9995 25.9678L27.7093 16.9724C27.6915 16.4204 27.2296 15.9874 26.6776 16.0052C26.1256 16.023 25.6925 16.4849 25.7103 17.0369L25.9683 25.0328L17.9724 25.2907C17.4204 25.3085 16.9874 25.7704 17.0052 26.3224C17.023 26.8744 17.4849 27.3075 18.0369 27.2897L27.0322 26.9995ZM10.3161 11.7295L26.3161 26.7295L27.6839 25.2705L11.6839 10.2705L10.3161 11.7295Z" fill="#5CCC9D"/>
                </svg>
            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        Add stars
                    </div>
                    <div className="history-item__changes">
                        <div className="history-item__benefits">
                            <div className="history-game-result-star _active"></div>
                            <span>{fee}</span>
                            Service fee
                        </div>
                        <div className="history-item__affilate-profit">
                            <div className="history-game-result-star _active _win"></div>
                            <span>20</span>
                            <div>Yours 20%</div>
                        </div>
                    </div>
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    <div className="history-item__win">+{profit}</div>
                </div>
            </div>
        </div>
    )
};

export default AffilateItemAdd
