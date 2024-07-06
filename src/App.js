import React, { createRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Star from './components/Star/Star';
import { useApp } from './hooks/useApp';
import { useScroll } from './hooks/useScroll';
import { useTelegram } from './hooks/useTelegram';
import AddStars from './pages/AddStars/AddStars';
import Affilate from './pages/Affilate/Affilate';
import CheckWinNumber from './pages/CheckWinNumber/CheckWinNumber';
import History from './pages/History/History';
import Home from './pages/Home/Home';
import Withdraw from './pages/Withdraw/Withdraw';
import { useLoginUserQuery } from './store/services/starsGame';

const routes = [
    {id: 1, path: '/', name: 'Home', element: <Home />, nodeRef: createRef()},
    {id: 2, path: '/history', name: 'History', element: <History />, nodeRef: createRef()},
    {id: 3, path: '/affilate', name: 'Affilate', element: <Affilate />, nodeRef: createRef()},
    {id: 4, path: '/add-stars', name: 'AddStars', element: <AddStars />, nodeRef: createRef()},
    {id: 5, path: '/withdraw', name: 'WithDraw', element: <Withdraw />, nodeRef: createRef()},
    {id: 6, path: '/check-win-num', name: 'CheckWinNumber', element: <CheckWinNumber />, nodeRef: createRef()},
]

const telegramId = 658318611


function App({

}) {
    const {tg} = useTelegram();
    const { 
        handleInitDataFetch,
        isLoaded,
        isWithdrawPage
    } = useApp();

    const { scrollTop } = useScroll()

    const { data: iniData, isLoading: isInitLoading, isError } = useLoginUserQuery(telegramId)

    useEffect(() => {
        tg.ready()
        tg.expand()
        tg.enableClosingConfirmation()
    }, [])

    useEffect(() => {
        if (!isInitLoading) {
            handleInitDataFetch(iniData)
            console.log(iniData)
        }
    }, [isInitLoading])

    if (isError) {
        return (
            <div>Ошибка подключения к серверу</div>
        )
    }

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
