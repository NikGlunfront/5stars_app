import React, { useEffect } from "react"
import AffilateList from "../../components/AffilateList/AffilateList";
import { useApp } from "../../hooks/useApp";
import { useLocation, useNavigate } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import AffilateTodayList from "../../components/AffilateList/AffilateTodayList";
import { useGetReferralQuery } from "../../store/services/starsGame";
import { useTelegram } from "../../hooks/useTelegram";
import RequestButton from "../../components/UI/RequestButton/RequestButton";

const telegramId = 658318611

const Affilate= ({}) => {
    const {
        setIsWithDraw,
        isPremium,
        partnershipBalance,
        activePartnerBalance
    } = useApp()

    const {user: tgUser, hideTgButton} = useTelegram()
    const navigate = useNavigate()
    const {data: refData, isLoading: isRefDataLoading, refetch: refetchRefQuery} = useGetReferralQuery(tgUser|telegramId)

    const { scrollTop } = useScroll()
    const location = useLocation()
    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
        setIsWithDraw(false)
        hideTgButton()
        refetchRefQuery()
    }, [])

    useEffect(() => {
        if (refData && !isRefDataLoading) {
            console.log(refData)
        }
    }, [refData, isRefDataLoading])

    const navigateToSwapStars = () => {
        if (activePartnerBalance === 'star') {
            navigate('/withdraw')
        }
    }

    if (!refData) {
        return
    }

    return (
        <div className={"affilate-page" + (isPremium ? " _premium" : '')}>
            <RequestButton
                onClick={navigateToSwapStars}
                disabled={partnershipBalance === 0 ? true : false}
            >
                <span>{activePartnerBalance === 'star' ? 'Swap Stars' : 'Connect TON Space'}</span>
                    {activePartnerBalance === 'star' &&
                        <div>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83401 0.439639C6.09948 -0.146547 6.90052 -0.146546 7.16599 0.43964L8.55758 3.51234C8.6646 3.74867 8.87989 3.91196 9.12877 3.9456L12.3576 4.38201C12.9725 4.46511 13.2194 5.25373 12.7698 5.6981L10.3976 8.04239C10.2165 8.22134 10.1348 8.48364 10.1807 8.73915L10.7824 12.0908C10.8966 12.7268 10.2492 13.2149 9.70432 12.9035L6.85435 11.2746C6.63366 11.1485 6.36635 11.1485 6.14565 11.2746L3.29568 12.9035C2.75084 13.2149 2.10336 12.7268 2.21756 12.0908C2.39945 11.0631 2.53616 10.1778 2.78159 9.58162C3.47699 8.517 7.19942 7.11169 7.0318 6.88987C7.0767 6.68584 2.69978 7.70788 1.96348 7.28203L1.55442 7.02652L0.230238 5.6981C-0.21942 5.25373 0.0275324 4.46511 0.642364 4.38201L3.87123 3.9456C4.12011 3.91196 4.3354 3.74867 4.44243 3.51234L5.83401 0.439639Z" fill="white"/>
                            </svg>
                            {partnershipBalance}
                        </div>
                    }   
            </RequestButton>
            <div className="history-list-title">TODAY</div>
            <AffilateTodayList refData={refData?.today ? refData?.today : null} />
            <div className="history-list-title">FULL HISTORY</div>
            <AffilateList refData={refData?.all ? refData?.all : null} />
        </div>
    )
};

export default Affilate
