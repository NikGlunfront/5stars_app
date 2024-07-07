import React, { useEffect } from "react"
import AffilateList from "../../components/AffilateList/AffilateList";
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import AffilateTodayList from "../../components/AffilateList/AffilateTodayList";

const Affilate= ({}) => {
    const {
        setIsWithDraw,
        isPremium
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
        <div className={"affilate-page" + (isPremium ? " _premium" : '')}>
            <div className="history-list-title">TODAY</div>
            <AffilateTodayList />
            <div className="history-list-title">FULL HISTORY</div>
            <AffilateList />
        </div>
    )
};

export default Affilate
