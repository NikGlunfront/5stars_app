import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    betAmount: 10,
    betMultiply: 5,
    pickedStars: [],
    isGameFinished: false,
    resultNumber: 0,
    gameResult: 0,
    hash_1: null,
    hash_2: null,
    game_id: 0
}

export const gameSlice = createSlice({
    name: 'stargame',
    initialState,
    reducers: {
        setBetAmount: (state, action) => {
            return {
                ...state, betAmount: action.payload
            }
        },
        setPickedStars: (state, action) => {
            return {
                ...state, pickedStars: action.payload
            }
        },
        setIsGameFinished: (state, action) => {
            return {
                ...state, isGameFinished: action.payload
            }
        },
        calculateGameResults: (state, action) => {
            let resultWin = 0
            if (state.pickedStars.includes(state.resultNumber)) {
                resultWin = state.betAmount * state.betMultiply - (state.pickedStars.length) * state.betAmount
            }
            return {
                ...state, 
                isGameFinished: true,
                gameResult: resultWin
            }
        },
        setGameResult: (state, action) => {
            return {
                ...state, gameResult: action.payload
            }
        },
        setNewResultNumber: (state, action) => {
            let newNum = Math.floor(Math.random() * (5000 - 2500) + 2500) % 5
            return {
                ...state,
                resultNumber: newNum === 0 ? 5 : newNum
            }
        },
        setResultNumber: (state, action) => {
            return {
                ...state, resultNumber: action.payload
            }
        },
        playNewGame: (state, action) => {
            
            return {
                ...state,
                isGameFinished: false,
                gameResult: 0,
                pickedStars: [],
                resultNumber: null
            }
        },
        setHash1: (state, action) => {
            return {
                ...state, hash_1: action.payload
            }
        },
        setHash2: (state, action) => {
            return {
                ...state, hash_2: action.payload
            }
        },
        setGameId: (state, action) => {
            return {
                ...state, game_id: action.payload
            }
        }
    }
})

export const {
    setBetAmount,
    setPickedStars,
    setIsGameFinished,
    calculateGameResults,
    playNewGame,
    setNewResultNumber,
    setHash1,
    setResultNumber,
    setHash2,
    setGameId,
    setGameResult
} = gameSlice.actions

export default gameSlice.reducer