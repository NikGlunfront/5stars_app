import { useDispatch, useSelector } from "react-redux";
import { setActivePartnerBalance, setAirdropBalance, setGamesLeft, setIsApplicationLoaded, setIsPremium, setIsWithdrawPage, setMainBalance, setPartnershipBalance, setPBalanceAirdrop, setReferralsCount } from "../store/slices/appSlice/appSlice";
import { setGameId, setHash2 } from "../store/slices/gameSlice/gameSlice";

export function useApp() {
    const dispatch = useDispatch()
    const { 
        isLoaded, 
        isWithdrawPage,
        mainBalance,
        airdropBalance,
        partnershipBalance,
        referralsCount,
        gamesLeft,
        activePartnerBalance,
        isPremium,
        partnershipBalanceAirdrop
    } = useSelector(state => state.app)

    const changeRefNum = (val) => {
        dispatch(setReferralsCount(val))
    }

    const changePAirdropBalance = (val) => {
        dispatch(setPBalanceAirdrop(val))
    }

    const setIsAppLoaded = (isLoaded) => {
        dispatch(setIsApplicationLoaded(isLoaded))
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
        changeRefNum(balanceObject.referals_count)
    }

    const updateActiveGame = (gameObj) => {
        dispatch(setHash2(gameObj.hash2))
        dispatch(setGameId(gameObj.game_id))
        dispatch(setGamesLeft(gameObj.games_left))
    }

    const handleInitDataFetch = (iniData) => {
        dispatch(setIsPremium(iniData.is_premium == 1 ? true : false))
        dispatch(setIsApplicationLoaded(true))
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
        airdropBalance,
        partnershipBalance,
        activePartnerBalance,
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
        partnershipBalanceAirdrop,
        changeActivePartnerBalance,
        changePAirdropBalance
    }
}