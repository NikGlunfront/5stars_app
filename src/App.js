import './App.scss';
import React, { createRef, useEffect, useState } from 'react'
import Star from './components/Star/Star';
import FairGame from './components/FairGame/FairGame';
import Game from './components/Game/Game';
import { useTelegram } from './hooks/useTelegram';
import { useApp } from './hooks/useApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import Affilate from './pages/Affilate/Affilate';

const routes = [
    { path: '/', name: 'Home', element: <Home />, nodeRef: createRef()},
    { path: '/history', name: 'History', element: <History />, nodeRef: createRef()},
    { path: '/affilate', name: 'Affilate', element: <Affilate />, nodeRef: createRef()},
]


function App({

}) {
    const {tg} = useTelegram();
    const { setIsAppLoaded, isLoaded } = useApp();

    useEffect(() => {
        tg.ready()
        tg.expand()
        tg.enableClosingConfirmation()
        
        setTimeout(() => {
            setIsAppLoaded(true)
        }, 2500);
    }, [])

    return (
        <div className={"s5-app" + (isLoaded ? ' _inited' : '')}>
            <div className="s5-app__container">
                <BrowserRouter>
                    <Star />    
                    <Routes>
                        {routes.map(route => (
                            <Route path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </BrowserRouter>

                
            </div>
        </div>
    );
}

export default App;
