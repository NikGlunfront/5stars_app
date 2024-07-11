import React, { useEffect, useState } from "react"
import winNumber from '../../assets/img/icons/win_star.svg'
import { useApp } from "../../hooks/useApp";
import { useStarGame } from "../../hooks/useStarGame";
import { useScroll } from "../../hooks/useScroll";
import { useLocation } from "react-router-dom";
import RequestButton from "../../components/UI/RequestButton/RequestButton";
import { useTelegram } from "../../hooks/useTelegram";
import { useGenerateHashFromStringMutation } from "../../store/services/starsGame";
import BoxWrapper from "../../components/Wrappers/BoxWrapper";
import starImg from '../../assets/img/icons/game/bet_star_orange.svg'


const starTable = [
    {number: 1, winNumber: [1]},
    {number: 2, winNumber: [2]},
    {number: 3, winNumber: [3]},
    {number: 4, winNumber: [4]},
    {number: 5, winNumber: [5, 0]},
]

const CheckWinNumber= ({
    
}) => {
    const {
        isLoaded
    } = useApp()

    const {
        isGameFinished,
        resultNumber,
        hash_1,
        hash_2
    } = useStarGame()

    const { sendAlert, hideTgButton } = useTelegram()

    const { scrollTop } = useScroll()
    const location = useLocation()
    const [testHash1, setTestHash1] = useState('')
    const [generateHash, {data: generatedHash, isloading: isGeneratedHashLoading}] = useGenerateHashFromStringMutation()


    useEffect(() => {
        scrollTop()
    }, [location.pathname])

    const handleHashChange = (e) => {
        setTestHash1(e.target.value)
    }

    const copyHash = () => {
        navigator.clipboard.writeText(hash_1).then(() => {
            sendAlert('HASH copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
        },() => {
            sendAlert('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
        });
    }

    const generateHashHandler = () => {
        generateHash(testHash1)
    }

    useEffect(() => {
        if (generatedHash && !isGeneratedHashLoading) {
            console.log(generatedHash)
        }
    }, [generateHash, isGeneratedHashLoading])

    useEffect(() => {
        hideTgButton()
    }, [])

    if (!isGameFinished) {
        return
    }

    return (
        <div className="check-number-page">
            <div className="title-history">
                <div className="check-number-page__resultstar">
                    <img src={winNumber} alt="winNumber" />
                    <span>{resultNumber}</span>
                </div>
                <div className="intro-star-topper__subtitle">Check Win Number</div>
            </div>

            <div className="hashes-check-number">
                <div className="hashes-check-number__item _revealed">
                    <div className="copy-btn" onClick={copyHash}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1113 5.81502C11.1113 5.30416 10.9084 4.81422 10.5472 4.45298C10.1859 4.09175 9.69598 3.88881 9.18512 3.88881H2.92619C2.67324 3.88881 2.42276 3.93863 2.18906 4.03543C1.95536 4.13223 1.74302 4.27412 1.56416 4.45298C1.38529 4.63185 1.2434 4.84419 1.1466 5.07789C1.0498 5.31159 0.99998 5.56207 0.99998 5.81502V12.0739C0.99998 12.3269 1.0498 12.5774 1.1466 12.8111C1.2434 13.0448 1.38529 13.2571 1.56416 13.436C1.74302 13.6148 1.95536 13.7567 2.18906 13.8535C2.42276 13.9503 2.67324 14.0002 2.92619 14.0002H9.18512C9.43807 14.0002 9.68855 13.9503 9.92225 13.8535C10.1559 13.7567 10.3683 13.6148 10.5472 13.436C10.726 13.2571 10.8679 13.0448 10.9647 12.8111C11.0615 12.5774 11.1113 12.3269 11.1113 12.0739V5.81502Z" stroke="#A19BBF" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.2681 10.9214C13.4898 10.7954 13.6743 10.613 13.8026 10.3926C13.931 10.1723 13.9988 9.92189 13.999 9.66687V2.44448C13.999 1.65002 13.349 1 12.5545 1H5.33215C4.79047 1 4.4958 1.27806 4.24879 1.72224" stroke="#A19BBF" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span>Revealed hash</span>
                    <p>{hash_1}</p>
                </div>
                <div className="hashes-check-number__item _win">
                    <span>Win number hash</span>
                    <p>{hash_2}</p>
                </div>
            </div>

            <div className="check-number-page__sha256">
                HASH GENERATE SHA256
            </div>
            <div className="hashes-check-number">
                <div className="hashes-check-number__hash">
                    <div className="hashes-check-number__label">Value</div>
                    <textarea type="text" value={testHash1} onChange={handleHashChange} >{testHash1}</textarea>
                </div>
                <div className="hashes-check-number__hash">
                    <div className="hashes-check-number__label">Hash</div>
                    <p>{generatedHash?.hash ? generatedHash?.hash : ''}</p>
                </div>
                <RequestButton
                    className={"hashes-check-number__btn"}
                    isloading={isGeneratedHashLoading}
                    disabled={testHash1.length !== 64}
                    onClick={generateHashHandler}
                >
                    Generate Hash
                </RequestButton>
            </div>

            {generatedHash &&
            <div className="conversion-hash">
                <div className="conversion-hash__title">
                    16bit to 10bit coversion
                </div>
                <div className="conversion-hash__bits">
                    {generatedHash.bits.map((bitItem) => (
                        <div key={bitItem.bitName} className="conversion-hash__bit">
                            <span>{bitItem.bitName}</span>
                            <span>{bitItem.val}</span>
                        </div>
                    ))}
                </div>
                <div className="conversion-hash__btns">
                    <div>16bit</div>
                    <div>10bit</div>
                    <div>Convert</div>
                </div>
            </div>
            }

            {generatedHash &&
            <BoxWrapper>

                <div className="win-number-result">
                    <div className="win-number-result__title">Getting Win Number</div>
                    <div className="win-number-result__row">
                        <div className="win-number-result__item">
                            <span>1</span>
                            <div>
                                Summering all gotten decimal numbers  <span>{generatedHash.hash_sub}</span>
                            </div>
                        </div>
                        <div className="win-number-result__item">
                            <span>2</span>
                            <div>
                                Dividing it on  <span>5 = {Math.floor(generatedHash.hash_sub / 5)} + {generatedHash.hash_sub % 5}</span>
                            </div>
                        </div>
                        <div className="win-number-result__item">
                            <span>3</span>
                            <div>
                                <span>{generatedHash.hash_sub % 5}</span> is a win number which corresponds to the table below
                            </div>
                        </div>
                    </div>
                    <div className="win-number-result__stars">
                        {starTable.map(star => (
                            <div key={star.number} className={"win-number-result__staritem" + (star.winNumber.includes(generatedHash.hash_sub % 5) ? " _win" : '')}>
                                <img src={starImg} alt="" />
                                <div>{star.number}</div>
                                <span>{star.winNumber.includes(generatedHash.hash_sub % 5) ? generatedHash.hash_sub % 5 : star.number}</span>
                            </div>
                        ))}
                    </div>
                    {/* <div className="win-number-result__sum">
                        <div>
                            <span>Сумма</span>
                            <span>{generatedHash.hash_sub}</span>
                        </div>
                        <div>
                            <span>Получает</span>
                            <span>{Math.floor(generatedHash.hash_sub / 5)}x{generatedHash.hash_sub % 5}</span>
                        </div>
                    </div>
                    <div className="table-win-number">
                        <span>ТАБЛИЦА</span>
                        {starTable.map(starRow => (
                            <div 
                                key={starRow.number}
                                className={
                                    "table-win-number__row" + 
                                    (generatedHash.hash_sub % 5 === starRow.number ? " _active" : "") +
                                    (generatedHash.hash_sub % 5 - 1 === starRow.number ? " _active_prev" : "")
                                }
                            >
                                <span>{starRow.number} = </span>
                                <span>{starRow.winNumber}</span>
                            </div>
                        ))}
                    </div> */}
                </div>
            </BoxWrapper>
            }
        </div>
    )
};

export default CheckWinNumber
