import React, { useEffect } from "react"
import AffilateList from "../../components/AffilateList/AffilateList";
import { useApp } from "../../hooks/useApp";

const Affilate= ({}) => {
    const {
        setIsWithDraw
    } = useApp()
    
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
