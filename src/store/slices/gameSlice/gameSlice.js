import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    betAmount: 10,
    betMultiply: 5,
    pickedStars: [],
    isGameFinished: false,
    resultNumber: 0,
    gameResult: 0,
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
        setNewResultNumber: (state, action) => {
            let newNum = Math.floor(Math.random() * (5000 - 2500) + 2500) % 5
            return {
                ...state,
                resultNumber: newNum === 0 ? 5 : newNum
            }
        },
        playNewGame: (state, action) => {
            let newNum = Math.floor(Math.random() * (5000 - 2500) + 2500) % 5
            return {
                ...state,
                isGameFinished: false,
                gameResult: 0,
                pickedStars: [],
                resultNumber: newNum === 0 ? 5 : newNum
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
    setNewResultNumber
} = gameSlice.actions

export default gameSlice.reducer