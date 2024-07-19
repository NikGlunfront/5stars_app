import { useDispatch, useSelector } from "react-redux"
import { setBetAmount, setGameResult, setHash1, setHash2, setIsGameFinished, setPickedStars, setResultNumber } from "../store/slices/gameSlice/gameSlice"
import { playNewGame } from "../store/slices/gameSlice/gameSlice"
import { setNewResultNumber } from "../store/slices/gameSlice/gameSlice"
import { calculateGameResults } from "../store/slices/gameSlice/gameSlice"
import { setAirdropBalance, setIsApplicationLoaded, setIsMainBalanceLoading, setMainBalance, setPartnershipBalance } from "../store/slices/appSlice/appSlice"
import { useTelegram } from "./useTelegram"

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
        game_id,
        gameResult
    } = useSelector(state => state.stargame)

    const { sendAlert, vibrate4ALert } = useTelegram()

    const { mainBalance, gamesLeft } = useSelector(state => state.app)

    const initWinNum = () => {
        dispatch(setNewResultNumber())
    }

    const handleStarClick = (starId) => {
        if (gamesLeft === 0) {
            vibrate4ALert()
            vibrate4ALert()
            sendAlert('Количество попыток закончилось')
            return
        }
        let newResultStars
        if (pickedStars.includes(starId)) {
            newResultStars = pickedStars.filter(star => star !== starId)
        } else {
            newResultStars = [...pickedStars, starId]
        }

        let newBalanceNum = mainBalance - newResultStars.length * betAmount
        if (newBalanceNum < 0) {
            vibrate4ALert()
            vibrate4ALert()
            sendAlert('Ставка превышает доступный баланс')
            return
        }

        dispatch(setPickedStars(newResultStars))

    }

    const changeBet = (newBetAmount) => {
        dispatch(setPickedStars([]))
        dispatch(setBetAmount(newBetAmount))
    }

    const calculateGame = () => {
        dispatch(calculateGameResults())
    }

    const startNewGame = () => {
        dispatch(playNewGame())
    }

    const updateHash1 = (hash) => {
        dispatch(setHash1(hash))
    }
    const updateHash2 = (hash) => {
        dispatch(setHash2(hash))
    }

    const setGameFinishedTrue = () => {
        dispatch(setIsGameFinished(true))
    }

    const setPlayedGame = (activeGameOjb) => {
        dispatch(setPickedStars([...activeGameOjb.picked_stars]))
        dispatch(setBetAmount(parseInt(activeGameOjb.bet_amount)))
        dispatch(setResultNumber(parseInt(activeGameOjb.win_num)))
        dispatch(setIsGameFinished(true))
        if (activeGameOjb.picked_stars.includes(parseInt(activeGameOjb.win_num))) {
            dispatch(setGameResult(parseInt(activeGameOjb.bet_amount) * 5 - activeGameOjb.picked_stars.length * parseInt(activeGameOjb.bet_amount)))
        } else {
            dispatch(setGameResult(0))
        }
        dispatch(setIsMainBalanceLoading(false))
    }


    return {
        pickedStars,
        betAmount,
        game_id,
        betMultiply,
        isGameFinished,
        resultNumber,
        gameResult,
        hash_1,
        hash_2,
        handleStarClick,
        changeBet,
        calculateGame,
        setPlayedGame,
        startNewGame,
        initWinNum,
        updateHash1,
        updateHash2,
        setGameFinishedTrue
    }
}