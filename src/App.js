import React, { createRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Star from './components/Star/Star';
import { useApp } from './hooks/useApp';
import { useTelegram } from './hooks/useTelegram';
import AddStars from './pages/AddStars/AddStars';
import Affilate from './pages/Affilate/Affilate';
import CheckWinNumber from './pages/CheckWinNumber/CheckWinNumber';
import History from './pages/History/History';
import Home from './pages/Home/Home';
import Withdraw from './pages/Withdraw/Withdraw';
import { useGetActiveGameQuery, useGetBalancesQuery, useLoginUserQuery, useSetRefPartnerMutation } from './store/services/starsGame';
import { useStarGame } from './hooks/useStarGame';

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
    const {tg, user: tgUser, hideTgButton} = useTelegram();
    const { 
        handleInitDataFetch,
        isLoaded,
        isWithdrawPage,
        updateAllBalances,
        updateActiveGame,
        mainBalance
    } = useApp();

    const { setPlayedGame, updateHash1 } = useStarGame()

    const { data: iniData, isLoading: isInitLoading, isError } = useLoginUserQuery(tgUser|telegramId)
    const { data: balancesData, isLoading: isBalanceDataLoading, isError: isBalanceDataError } = useGetBalancesQuery(tgUser|telegramId)
    const { data: activeGame, isLoading: isActiveGameLoading, isError: isActiveGameError } = useGetActiveGameQuery(tgUser|telegramId)
    const [setRefPartner, {data, isLoading}] = useSetRefPartnerMutation()

    async function setRef (ref) {
        await setRefPartner({
            tg_id: tgUser | telegramId,
            ref: ref
        })
    }

    useEffect(() => {
        tg.ready()
        tg.expand()
        tg.enableClosingConfirmation()
    }, [])

    useEffect(() => {
        if (tg.initDataUnsafe?.start_param) {
            setRef(tg.initDataUnsafe?.start_param)
        }
    }, [tg.initDataUnsafe?.start_param])

    useEffect(() => {
        if (!isInitLoading) {
            handleInitDataFetch(iniData)
            console.log(iniData)
        }
    }, [iniData])

    useEffect(() => {
        if (iniData && balancesData && !isBalanceDataLoading) {
            updateAllBalances(balancesData)
            console.log(balancesData)
        }
    }, [isBalanceDataLoading, balancesData, iniData])

    useEffect(() => {
        if (iniData && activeGame && !isActiveGameLoading) {
            updateActiveGame(activeGame)
            console.log(activeGame)
            if (activeGame.result_history) {
                console.log(activeGame.result_history)
                updateHash1(activeGame.hash1)
                setPlayedGame(activeGame.result_history)
            }
        }
    }, [isActiveGameLoading, activeGame, iniData])

    useEffect(() => {
        if (mainBalance >= 10) {
            hideTgButton()
        }
    }, [mainBalance])

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
