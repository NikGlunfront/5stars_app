import React, { useEffect, useState } from 'react';
import Game from '../../components/Game/Game';
import FairGame from '../../components/FairGame/FairGame';
import { useApp } from '../../hooks/useApp';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import { useTelegram } from '../../hooks/useTelegram';
import { useSelector } from 'react-redux';
import AddStars from '../AddStars/AddStars';
import AddStarsGamePrize from '../AddStars/AddStarsGamePrize';

const Home = ({

}) => {

    const {
        setIsWithDraw,
        isLoaded,
        mainBalance
    } = useApp()

    const { isVisibleBonus } = useSelector(state => state.addStar)

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
        <div className='homepage'>
            {isLoaded &&
                <div className="s5-app__content">
                    {<AddStarsGamePrize />}
                    {(mainBalance < 10) && <AddStars />}
                    {(mainBalance >= 10) && <Game />}
                

                    <FairGame />
                </div>
            }
        </div>
    );
};

export default Home;