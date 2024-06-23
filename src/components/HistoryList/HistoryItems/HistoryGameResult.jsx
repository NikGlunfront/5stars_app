import React from "react"

const betStars = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
]

const HistoryGameResult= ({
    gameData
}) => {
    const {
        date,
        betAmount,
        bets,
        gameResult,
        winNumber,
        fee
    } = gameData
    return (
        <div className="history-item history-item_game_result">
            <div className={"history-item__img" + (gameResult > 0 ? ' _win' : '')}>
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3801 1.33562C19.2164 -0.445207 21.7401 -0.445205 22.5765 1.33562L26.9607 10.6704C27.2979 11.3884 27.9761 11.8845 28.7602 11.9867L38.9328 13.3125C40.8698 13.5649 41.6478 15.9608 40.2312 17.3107L32.7576 24.4326C32.1871 24.9763 31.9299 25.7732 32.0744 26.5494L33.9701 36.7316C34.3299 38.6639 32.29 40.1468 30.5735 39.2007L21.5947 34.2521C20.8994 33.8689 20.0572 33.8689 19.3619 34.2521L10.3831 39.2007C8.66653 40.1468 6.62665 38.6639 6.98642 36.7316C7.55947 33.6095 7.99018 30.92 8.76342 29.1088C10.9543 25.8745 22.6818 21.6052 22.1537 20.9313C22.2952 20.3115 8.50567 23.4164 6.18594 22.1227L4.8972 21.3465L0.725364 17.3107C-0.691284 15.9607 0.086741 13.5649 2.02377 13.3125L12.1963 11.9867C12.9804 11.8845 13.6587 11.3884 13.9959 10.6704L18.3801 1.33562Z" fill="#918F9C"/>
                </svg>
                <span>{gameResult}</span>
            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        <div className="history-item__stars">
                            {betStars.map(star => (
                                <div className={"history-game-result-star" + (bets.includes(star.id) ? ' _active' : '') + (star.id === winNumber ? ' _win' : '')}></div>
                            ))}
                        </div>
                    </div>
                    <div className="history-item__changes">
                        <div className="history-item__spend">
                            <div className="history-game-result-star _active"></div>
                            {betAmount * bets.length}
                        </div>
                        <div className="history-item__profit">
                            <div className={"history-game-result-star _active" + (gameResult > 0 ? " _win" : '')}></div>
                            {gameResult}
                        </div>
                        <div className="history-item__benefits">
                            <div className="history-game-result-star _active"></div>
                            <span>{fee}</span>
                            Service fee
                        </div>
                    </div>
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    {gameResult > 0
                        ?
                        <div className="history-item__win">+{gameResult - betAmount * bets.length - fee}</div>
                        :
                        <div className="history-item__lose">-{betAmount * bets.length}</div>
                    }
                </div>
            </div>
        </div>
    )
};

export default HistoryGameResult
