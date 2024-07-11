import React, { useEffect } from "react"
import BoxWrapper from "../../components/Wrappers/BoxWrapper";
import HistoryList from "../../components/HistoryList/HistoryList";
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { useTelegram } from "../../hooks/useTelegram";

const History= ({

}) => {
    const {
        setIsWithDraw
    } = useApp()

    const { hideTgButton } = useTelegram()
    const { scrollTop } = useScroll()
    const location = useLocation()
    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
        hideTgButton()
        setIsWithDraw(false)
    }, [])

    return (
        <div className="history-page">
            <div className="history-list-title">Full History</div>
            <HistoryList />
        </div>
    )
};

export default History


