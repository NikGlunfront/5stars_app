import React, { useEffect } from "react"
import BoxWrapper from "../../components/Wrappers/BoxWrapper";
import HistoryList from "../../components/HistoryList/HistoryList";
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";

const History= ({

}) => {
    const {
        setIsWithDraw
    } = useApp()

    const { scrollTop } = useScroll()
    const location = useLocation()
    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
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


