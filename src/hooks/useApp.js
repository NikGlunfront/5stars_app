import { useDispatch, useSelector } from "react-redux";
import { setAirdropBalance, setIsApplicationLoaded, setIsPremium, setIsWithdrawPage, setMainBalance, setPartnershipBalance } from "../store/slices/appSlice/appSlice";
import { setGameId, setHash2 } from "../store/slices/gameSlice/gameSlice";

export function useApp() {
    const dispatch = useDispatch()
    const { 
        isLoaded, 
        isWithdrawPage,
        mainBalance,
        airdropBalance,
        partnershipBalance,
        isPremium
    } = useSelector(state => state.app)

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
    }

    const updateActiveGame = (gameObj) => {
        dispatch(setHash2(gameObj.hash2))
        dispatch(setGameId(gameObj.game_id))
    }

    const handleInitDataFetch = (iniData) => {
        dispatch(setIsPremium(iniData.is_premium == 1 ? true : false))
        dispatch(setIsApplicationLoaded(true))
    }

    return {
        isLoaded,
        isWithdrawPage,
        mainBalance,
        isPremium,
        airdropBalance,
        partnershipBalance,
        setIsAppLoaded,
        setIsWithDraw,
        changeMainBalance,
        changeAirdropBalance,
        changePartnershipBalance,
        updateAllBalances,
        handleInitDataFetch,
        updateActiveGame,
        changeIsPremium
    }
}