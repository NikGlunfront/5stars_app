import { useDispatch, useSelector } from "react-redux"
import { setBetAmount, setHash1, setHash2, setPickedStars } from "../store/slices/gameSlice/gameSlice"
import { playNewGame } from "../store/slices/gameSlice/gameSlice"
import { setNewResultNumber } from "../store/slices/gameSlice/gameSlice"
import { calculateGameResults } from "../store/slices/gameSlice/gameSlice"
import { setAirdropBalance, setIsApplicationLoaded, setMainBalance, setPartnershipBalance } from "../store/slices/appSlice/appSlice"

export function useStarGame() {
    const dispatch = useDispatch()
    
    const {
        pickedStars, 
        betAmount, 
        betMultiply,
        isGameFinished,
        resultNumber,
        hash_1,
        hash_2,
        gameResult
    } = useSelector(state => state.stargame)

    const initWinNum = () => {
        dispatch(setNewResultNumber())
    }

    const handleStarClick = (starId) => {
        let newResultStars
        if (pickedStars.includes(starId)) {
            newResultStars = pickedStars.filter(star => star !== starId)
        } else {
            newResultStars = [...pickedStars, starId]
        }

        dispatch(setPickedStars(newResultStars))
    }

    const changeBet = (newBetAmount) => {
        dispatch(setBetAmount(newBetAmount))
    }

    const calculateGame = () => {
        dispatch(calculateGameResults())
    }

    const createNewGame = () => {
        dispatch(playNewGame())
    }

    const updateHash1 = (hash) => {
        dispatch(setHash1(hash))
    }
    const updateHash2 = (hash) => {
        dispatch(setHash2(hash))
    }


    return {
        pickedStars,
        betAmount,
        betMultiply,
        isGameFinished,
        resultNumber,
        gameResult,
        hash_1,
        hash_2,
        handleStarClick,
        changeBet,
        calculateGame,
        createNewGame,
        initWinNum,
        updateHash1,
        updateHash2,
    }
}