import { useDispatch, useSelector } from "react-redux";
import { setActivePartnerBalance, setAirdropBalance, setGamesLeft, setIsApplicationLoaded, setIsMainBalanceLoading, setIsPremium, setIsWithdrawPage, setMainBalance, setPartnershipBalance, setPartnershipBalanceUsdt, setPBalanceAirdrop, setReferralsCount, setRefString } from "../store/slices/appSlice/appSlice";
import { setGameId, setHash2 } from "../store/slices/gameSlice/gameSlice";

export function useApp() {
    const dispatch = useDispatch()
    const { 
        isLoaded, 
        isWithdrawPage,
        mainBalance,
        airdropBalance,
        partnershipBalance,
        partnershipBalanceUsdt,
        referralsCount,
        gamesLeft,
        activePartnerBalance,
        isPremium,
        isMainBalanceLoading,
        ref,
        partnershipBalanceAirdrop
    } = useSelector(state => state.app)

    const changeRefNum = (val) => {
        dispatch(setReferralsCount(val))
    }
    
    const changePartnershipBalanceUsdt = (val) => {
        dispatch(setPartnershipBalanceUsdt(val))
    }

    const setRefHash = (hash) => {
        dispatch(setRefString(hash))
    }

    const changePAirdropBalance = (val) => {
        dispatch(setPBalanceAirdrop(val))
    }

    const setIsAppLoaded = (isLoaded) => {
        dispatch(setIsApplicationLoaded(isLoaded))
    }

    const setMainBalanceLoading = (isLoading) => {
        dispatch(setIsMainBalanceLoading(isLoading))
    }

    const setIsWithDraw = (isTrue) => {
        dispatch(setIsWithdrawPage(isTrue))
    }

    const changeMainBalance = (value) => {
        dispatch(setMainBalance(value))
    }
    const changeAirdropBalance = (value) => {
        dispatch(setAirdropBalance(value))
    }
    const changeIsPremium = (value) => {
        dispatch(setIsPremium(value))
    }
    const changePartnershipBalance = (value) => {
        dispatch(setPartnershipBalance(value))
    }

    const updateAllBalances = (balanceObject) => {
        changeMainBalance(balanceObject.balance|0)
        changeAirdropBalance(balanceObject.airdrop_balance|0)
        changePartnershipBalance(balanceObject.partnership_balance|0)
        changePAirdropBalance(balanceObject.partnership_balance_airdrop|0)
        changePartnershipBalanceUsdt(parseFloat(balanceObject.partnership_balance_usdt).toFixed(2))
        changeRefNum(balanceObject.referals_count)
    }

    const updateActiveGame = (gameObj) => {
        dispatch(setHash2(gameObj.hash2))
        dispatch(setGameId(gameObj.game_id))
        dispatch(setGamesLeft(gameObj.games_left))
    }

    const handleInitDataFetch = (iniData) => {
        dispatch(setIsPremium(parseInt(iniData.is_premium) ? true : false))
        setRefHash(iniData.ref)
        setTimeout(() => {
            dispatch(setIsApplicationLoaded(true))
        }, 1500);
    }

    const changeActivePartnerBalance = (balanceType) => {
        dispatch(setActivePartnerBalance(balanceType))
    }

    return {
        isLoaded,
        isWithdrawPage,
        mainBalance,
        isPremium,
        gamesLeft,
        referralsCount,
        ref,
        isMainBalanceLoading,
        airdropBalance,
        partnershipBalance,
        partnershipBalanceUsdt,
        activePartnerBalance,
        partnershipBalanceAirdrop,
        setIsAppLoaded,
        setIsWithDraw,
        changeMainBalance,
        changeAirdropBalance,
        changePartnershipBalance,
        updateAllBalances,
        handleInitDataFetch,
        updateActiveGame,
        changeIsPremium,
        changeRefNum,
        changeActivePartnerBalance,
        changePAirdropBalance,
        setMainBalanceLoading
    }
}