import './App.scss';
import React, { createRef, useEffect, useState } from 'react'
import Star from './components/Star/Star';
import FairGame from './components/FairGame/FairGame';
import Game from './components/Game/Game';
import { useTelegram } from './hooks/useTelegram';
import { useApp } from './hooks/useApp';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import Affilate from './pages/Affilate/Affilate';
import AddStars from './pages/AddStars/AddStars';
import Withdraw from './pages/Withdraw/Withdraw';
import CheckWinNumber from './pages/CheckWinNumber/CheckWinNumber';

const routes = [
    {id: 1, path: '/', name: 'Home', element: <Home />, nodeRef: createRef()},
    {id: 2, path: '/history', name: 'History', element: <History />, nodeRef: createRef()},
    {id: 3, path: '/affilate', name: 'Affilate', element: <Affilate />, nodeRef: createRef()},
    {id: 4, path: '/add-stars', name: 'AddStars', element: <AddStars />, nodeRef: createRef()},
    {id: 5, path: '/withdraw', name: 'WithDraw', element: <Withdraw />, nodeRef: createRef()},
    {id: 6, path: '/check-win-num', name: 'CheckWinNumber', element: <CheckWinNumber />, nodeRef: createRef()},
]


function App({

}) {
    const {tg} = useTelegram();
    const { 
        setIsAppLoaded, 
        isLoaded,
        isWithdrawPage
    } = useApp();

    useEffect(() => {
        tg.ready()
        tg.expand()
        tg.enableClosingConfirmation()
        
        setTimeout(() => {
            setIsAppLoaded(true)
        }, 2500);
    }, [])

    return (
        <div 
            className={
                "s5-app" + 
                (isLoaded ? ' _inited' : '') +
                (isWithdrawPage ? " _withdraw" : '')
            }
        >
            <div className={"s5-app__container"}>
                <BrowserRouter>
                    <Star />    
                    <Routes>
                        {routes.map(route => (
                            <Route key={route.id} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </BrowserRouter>

                
            </div>
        </div>
    );
}

export default App;
