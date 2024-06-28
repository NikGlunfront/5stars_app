import React, { useEffect } from "react"
import BoxWrapper from "../../components/Wrappers/BoxWrapper";
import HistoryList from "../../components/HistoryList/HistoryList";
import { useApp } from "../../hooks/useApp";

const History= ({

}) => {
    const {
        setIsWithDraw
    } = useApp()
    
    useEffect(() => {
        setIsWithDraw(false)
    }, [])

    return (
        <div className="history-page">
            <HistoryList />
        </div>
    )
};

export default History


