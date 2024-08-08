import React from 'react';

const AffilateItemSwap = ({swapData}) => {
    const {
        date,
        amount,
    } = swapData
    return (
        <div className="history-item history-item_add">
            <div className={"history-item__img"}>
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18.5" cy="18.5" r="18.5" fill="#E4E7FF"/>
                    <path d="M26.4483 13.4825C26.7148 13.216 26.7148 12.784 26.4483 12.5175L22.1057 8.17484C21.8392 7.90835 21.4071 7.90835 21.1406 8.17484C20.8741 8.44132 20.8741 8.87338 21.1406 9.13987L25.0008 13L21.1406 16.8601C20.8741 17.1266 20.8741 17.5587 21.1406 17.8252C21.4071 18.0916 21.8392 18.0916 22.1057 17.8252L26.4483 13.4825ZM11 13.6824H25.9658V12.3176H11V13.6824Z" fill="#5C67CC"/>
                    <path d="M10.5175 24.6711C10.251 24.4046 10.251 23.9726 10.5175 23.7061L14.8602 19.3634C15.1267 19.0969 15.5587 19.0969 15.8252 19.3634C16.0917 19.6299 16.0917 20.062 15.8252 20.3285L11.9651 24.1886L15.8252 28.0487C16.0917 28.3152 16.0917 28.7473 15.8252 29.0138C15.5587 29.2802 15.1267 29.2802 14.8602 29.0138L10.5175 24.6711ZM25.9658 24.871H11V23.5062H25.9658V24.871Z" fill="#5C67CC"/>
                </svg>

            </div>
            <div className="history-item__info">
                <div className="history-item__left">
                    <div className="history-item__topper">
                        Swap Stars
                    </div>
                    <div className="history-item__changes">
                        <div className="history-item__benefits">
                            <div className="history-game-result-star _active _green"></div>
                            <span>{amount}</span>
                        </div>
                        <div className="history-item__affilate-profit">
                            <div className="history-game-result-star _active _win"></div>
                            <span>{amount.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="history-item__date">{date}</div>
                </div>
                <div className="history-item__right">
                    <div className="history-item__lose _green">-{amount.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
};

export default AffilateItemSwap;