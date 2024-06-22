import { useDispatch, useSelector } from "react-redux"
import { setBetAmount, setPickedStars } from "../store/slices/gameSlice/gameSlice"
import { playNewGame } from "../store/slices/gameSlice/gameSlice"
import { setNewResultNumber } from "../store/slices/gameSlice/gameSlice"
import { calculateGameResults } from "../store/slices/gameSlice/gameSlice"

export function useStarGame() {
    const dispatch = useDispatch()
    
    const {
        pickedStars, 
        betAmount, 
        betMultiply,
        isGameFinished,
        resultNumber,
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


    return {
        pickedStars,
        betAmount,
        betMultiply,
        isGameFinished,
        handleStarClick,
        changeBet,
        calculateGame,
        createNewGame,
        initWinNum,
        resultNumber,
        gameResult
    }
}