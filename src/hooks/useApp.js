import { useDispatch, useSelector } from "react-redux";
import { setAirdropBalance, setIsApplicationLoaded, setIsWithdrawPage, setMainBalance, setPartnershipBalance } from "../store/slices/appSlice/appSlice";
import { setGameId, setHash2 } from "../store/slices/gameSlice/gameSlice";

export function useApp() {
    const dispatch = useDispatch()
    const { 
        isLoaded, 
        isWithdrawPage,
        mainBalance,
        airdropBalance,
        partnershipBalance
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
    const changePartnershipBalance = (value) => {
        dispatch(setPartnershipBalance(value))
    }

    const updateAllBalances = (balanceObject) => {
        changeMainBalance(balanceObject.balance|0)
        changeAirdropBalance(balanceObject.airdrop_balance|0)
        changePartnershipBalance(balanceObject.partnership_balance|0)
    }

    const handleInitDataFetch = (iniData) => {
        updateAllBalances(iniData.balance)
        dispatch(setIsApplicationLoaded(true))
        dispatch(setHash2(iniData.active_game.hash2))
        dispatch(setGameId(iniData.active_game.game_id))
    }

    return {
        isLoaded,
        isWithdrawPage,
        mainBalance,
        airdropBalance,
        partnershipBalance,
        setIsAppLoaded,
        setIsWithDraw,
        changeMainBalance,
        changeAirdropBalance,
        changePartnershipBalance,
        updateAllBalances,
        handleInitDataFetch
    }
}