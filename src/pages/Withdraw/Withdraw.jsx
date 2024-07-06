import React, { useEffect, useState } from "react"
import { useTelegram } from "../../hooks/useTelegram";
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";

const Withdraw= ({

}) => {
    const { 
        showTgButton,
        enableTgButton,
        disableTgButton
    } = useTelegram()

    const {
        setIsWithDraw,
        isWithdrawPage
    } = useApp()
    

    const [starsAmount, setStarsAmount] = useState('')
    const [tonRate, setTonRate] = useState(0.067656)

    const { scrollTop } = useScroll()
    const location = useLocation()
    useEffect(() => {
        scrollTop()
    }, [location.pathname])

    useEffect(() => {
        showTgButton('CONTINUE')
        setIsWithDraw(true)
    }, [])

    useEffect(() => {
        if (starsAmount > 0) {
            enableTgButton()
        } else {
            disableTgButton()
        }
    }, [starsAmount])

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
            return true
        }

        return false
    }

    const handleChange = (e) => {
        if (handleKeyPress(e)) {
            if (e.target.value > 500) {
                setStarsAmount(500)
            } else {
                setStarsAmount(e.target.value)
            }
        } else {
            e.preventDefault()
        }
    }

    return (
        <div className="withdraw-page">
            <div className="field-withdraw">
                <div className="field-withdraw__topper">
                    <div>You send</div>
                    <div onClick={() => setStarsAmount(500)}>
                        <span>Max.:</span>
                        <span>500</span>
                    </div>
                </div>
                <div className="field-withdraw__input">
                    <input type="number" 
                        pattern="[0-9]*" 
                        value={starsAmount} 
                        onChange={handleChange} 
                        onInput={handleKeyPress} 
                        autoFocus 
                        max={500}
                    />
                    <span>STAR</span>
                </div>
                <div className="field-withdraw__rate">
                    1 STAR = {tonRate} TON
                </div>
            </div>
            <div className="field-withdraw">
                <div className="field-withdraw__topper _ton">
                    <div>You recieve</div>
                    <div></div>
                </div>
                <div className="field-withdraw__input">
                    <div className="field-withdraw__num">{(starsAmount * tonRate).toFixed(5)}</div>
                    <span>TON</span>
                </div>
            </div>
        </div>
    )
};

export default Withdraw
