import React, { useEffect } from "react"
import AffilateList from "../../components/AffilateList/AffilateList";
import { useApp } from "../../hooks/useApp";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";

const Affilate= ({}) => {
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
        <div className="affilate-page">
            <AffilateList />
        </div>
    )
};

export default Affilate
