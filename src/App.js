import './App.scss';
import React, { useEffect, useState } from 'react'
import Star from './components/Star/Star';
import FairGame from './components/FairGame/FairGame';
import Game from './components/Game/Game';
import { useTelegram } from './hooks/useTelegram';
import { useStarGame } from './hooks/useStarGame';

function App({

}) {
    const {tg} = useTelegram();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        tg.ready()
        tg.expand()
        tg.enableClosingConfirmation()
        
        setTimeout(() => {
            setIsLoaded(true)
        }, 2500);
    }, [])

    return (
        <div className={"s5-app" + (isLoaded ? ' _inited' : '')}>
            <div className="s5-app__container">
                <Star />

                {isLoaded &&
                    <div className="s5-app__content">
                        <Game />
                    

                        <FairGame />
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
