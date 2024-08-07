import React, { useCallback, useEffect, useState } from "react"
import { useTelegram } from "../../hooks/useTelegram";
import { useApp } from "../../hooks/useApp";
import { useLocation, useNavigate } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import RequestButton from "../../components/UI/RequestButton/RequestButton";
import { useSwapStarsMutation } from "../../store/services/starsGame";

const Withdraw= ({

}) => {
    const { 
        showTgButton,
        enableTgButton,
        disableTgButton,
        user: tgUser,
        sendAlert,
        handleMainButtonClick,
        handleMainButtonOffEventClick,
        setTgButtonText
    } = useTelegram()

    const {
        setIsWithDraw,
        isWithdrawPage,
        partnershipBalance
    } = useApp()
    
    const navigate = useNavigate()
    const [starsAmount, setStarsAmount] = useState(0)
    const [tonRate, setTonRate] = useState(0.067656)
    const [swapStars, {data: swapStarsData, isLoading: isSwapStarsLoading}] = useSwapStarsMutation()

    const { scrollTop } = useScroll()
    const location = useLocation()
    useEffect(() => {
        scrollTop()
    }, [location.pathname])

    async function swapAccept(starsAmount) {
        if (starsAmount > 0) {
            await swapStars({
                tg_id: tgUser,
                swap_amount: starsAmount
            })
            sendAlert(`${starsAmount} Stars were successfuly swapped.`)
            navigate(-1)
        }
    }
    
    const handleSwapAccept = useCallback(() => {
        swapAccept(starsAmount)
    }, [starsAmount])

    useEffect(() => {
        showTgButton('CONTINUE')
        setIsWithDraw(true)
    }, [])

    useEffect(() => {
        handleMainButtonClick(handleSwapAccept)

        return () => {
            handleMainButtonOffEventClick(handleSwapAccept)
        }
    }, [handleSwapAccept])

    useEffect(() => {
        if (starsAmount > 0 && starsAmount <= partnershipBalance) {
            enableTgButton()
        } else {
            disableTgButton()
        }
        setTgButtonText(`Swap ${starsAmount > 0 ? starsAmount : ''} stars`)
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
            if (e.target.value > partnershipBalance) {
                setStarsAmount(partnershipBalance)
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
                    <div onClick={() => setStarsAmount(partnershipBalance)}>
                        <span>Max.:</span>
                        <span>{partnershipBalance}</span>
                    </div>
                </div>
                <div className="field-withdraw__input">
                    <input type="number" 
                        pattern="[0-9]*" 
                        value={starsAmount} 
                        onChange={handleChange} 
                        onInput={handleKeyPress} 
                        autoFocus 
                        max={partnershipBalance}
                    />
                    <span>STAR</span>
                </div>
                {/* <div className="field-withdraw__rate">
                    1 STAR = {tonRate} STAR
                </div> */}
            </div>
            <div className="field-withdraw">
                <div className="field-withdraw__topper _ton">
                    <div>You recieve</div>
                    <div></div>
                </div>
                <div className="field-withdraw__input">
                    <div className="field-withdraw__num">{starsAmount}</div>
                    <span>STAR</span>
                </div>
            </div>
            {/* <RequestButton
                onClick={handleSwapAccept}
                disabled={partnershipBalance < starsAmount}
            >
                Swap Stars
            </RequestButton> */}
        </div>
    )
};

export default Withdraw
