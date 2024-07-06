import React, { useEffect, useState } from 'react';
import Game from '../../components/Game/Game';
import FairGame from '../../components/FairGame/FairGame';
import { useApp } from '../../hooks/useApp';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';

const Home = ({

}) => {

    const {
        setIsWithDraw,
        isLoaded
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
        <div className='homepage'>
            {isLoaded &&
                <div className="s5-app__content">
                    <Game />
                

                    <FairGame />
                </div>
            }
        </div>
    );
};

export default Home;