import React, { useEffect, useState } from 'react';
import Game from '../../components/Game/Game';
import FairGame from '../../components/FairGame/FairGame';
import { useApp } from '../../hooks/useApp';

const Home = ({

}) => {

    const {
        setIsWithDraw,
        isLoaded
    } = useApp()
    
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