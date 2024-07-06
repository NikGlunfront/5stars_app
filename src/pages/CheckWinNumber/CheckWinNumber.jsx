import React, { useEffect } from "react"
import winNumber from '../../assets/img/icons/win_star.svg'
import { useApp } from "../../hooks/useApp";
import { useStarGame } from "../../hooks/useStarGame";
import { useScroll } from "../../hooks/useScroll";
import { useLocation } from "react-router-dom";

const hashBits = [
    {bitName: 'B5', val: 181},
    {bitName: '16', val: 22},
    {bitName: '6C', val: 108},
    {bitName: '33', val: 51},
    {bitName: '13', val: 19},
    {bitName: '1D', val: 29},
    {bitName: '2C', val: 44},
    {bitName: '00', val: 0},
    {bitName: '0E', val: 14},
    {bitName: '71', val: 113},
    {bitName: 'D6', val: 214},
    {bitName: 'AD', val: 173},
    {bitName: '83', val: 131},
    {bitName:  '58', val: 88},
    {bitName:  '1A', val: 26},
    {bitName: 'E6', val: 230},
    {bitName: '3D', val: 61},
    {bitName: 'AC', val: 172},
    {bitName: 'DD', val: 221},
    {bitName: '3C', val: 60},
    {bitName: '5C', val: 92},
    {bitName: 'D4', val: 212},
    {bitName: 'C6', val: 198},
    {bitName: 'E0', val: 224},
    {bitName: '7C', val: 124},
    {bitName: 'D3', val: 211},
    {bitName: 'F6', val: 246},
    {bitName: '31', val: 49},
    {bitName: '38', val: 56},
    {bitName: '74', val: 116},
    {bitName: '02', val: 2},
]

const hashSum = 3547

const starTable = [
    {number: 0, winNumber: 5},
    {number: 1, winNumber: 1},
    {number: 2, winNumber: 2},
    {number: 3, winNumber: 3},
    {number: 4, winNumber: 4},
    {number: 5, winNumber: 5},
]

const CheckWinNumber= ({
    
}) => {
    const {
        isLoaded
    } = useApp()

    const {
        isGameFinished,
        resultNumber
    } = useStarGame()

    const { scrollTop } = useScroll()
    const location = useLocation()
    useEffect(() => {
        scrollTop()
    }, [location.pathname])

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
                    <span>Revealed hash</span>
                    <p>B5166C33131D2C000E71D6AD83581AE63DACDD3C5CD4C6E07CD33CF631387402</p>
                </div>
                <div className="hashes-check-number__item _win">
                    <span>Win number hash</span>
                    <p>8E05DF936ED4B6852580C231108A579721148D974A0F44209EDC7B0FEEA6F68F</p>
                </div>
            </div>

            <div className="check-number-page__sha256">
                HASH GENERATE SHA256
            </div>
            <div className="hashes-check-number">
                <div className="hashes-check-number__item _revealed">
                    <p>B5166C33131D2C000E71D6AD83581AE63DACDD3C5CD4C6E07CD33CF631387402</p>
                </div>
                <div className="hashes-check-number__item _win">
                    <p>8E05DF936ED4B6852580C231108A579721148D974A0F44209EDC7B0FEEA6F68F</p>
                </div>
                <div className="hashes-check-number__btn">
                    Generate Hash
                </div>
            </div>


            <div className="conversion-hash">
                <div className="conversion-hash__title">
                    16bit to 10bit coversion
                </div>
                <div className="conversion-hash__bits">
                    {hashBits.map((bitItem) => (
                        <div className="conversion-hash__bit">
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

            <div className="win-number-result">
                <div className="win-number-result__title">Getting Win Number</div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, laudantium.</p>
                <div className="win-number-result__sum">
                    <div>
                        <span>Сумма</span>
                        <span>{hashSum}</span>
                    </div>
                    <div>
                        <span>Получает</span>
                        <span>{Math.floor(hashSum / 5)}x{hashSum % 5}</span>
                    </div>
                </div>
                <div className="table-win-number">
                    <span>ТАБЛИЦА</span>
                    {starTable.map(starRow => (
                        <div 
                            key={starRow.number}
                            className={
                                "table-win-number__row" + 
                                (hashSum % 5 === starRow.number ? " _active" : "") +
                                (hashSum % 5 - 1 === starRow.number ? " _active_prev" : "")
                            }
                        >
                            <span>{starRow.number} = </span>
                            <span>{starRow.winNumber}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default CheckWinNumber
