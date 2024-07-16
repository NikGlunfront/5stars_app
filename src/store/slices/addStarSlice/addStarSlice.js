import { createSlice } from "@reduxjs/toolkit"

const bonuses = [
    {id: 1, value: 100},
    {id: 2, value: 200},
    {id: 3, value: 300},
    {id: 4, value: 400},
    {id: 5, value: 500},
]

const prizes = [
    {id: 1, value: 50},
    {id: 2, value: 100},
    {id: 3, value: 150},
    {id: 4, value: 200},
    {id: 5, value: 250},
]

const initialState = {
    bonuses: bonuses,
    prizes: prizes,
    pickedStar: 0,
    activeBonusGame: [],
    isBonusGameFinished: false,
    isVisibleBonus: true,
    pickedStarPrize: 0,
    activeGamePrize: [],
    isGamePrizeFinished: false,
    isVisiblePrize: true,
    prizeId: null,
}

export const addStarSlice = createSlice({
    name: 'addStar',
    initialState,
    reducers: {
        shuffleBonuses: (state, action) => {
            let newArr = [...state.bonuses]
            for (let i = newArr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return {
                ...state, activeBonusGame: [...newArr]
            }
        },
        shufflePrizes: (state, action) => {
            let newArr = [...state.prizes]
            for (let i = newArr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return {
                ...state, activeGamePrize: [...newArr]
            }
        },
        revealBonusResult: (state, action) => {
            return {
                ...state, 
                isBonusGameFinished: true,
                pickedStar: action.payload,
            }
        },
        revealPrizeResult: (state, action) => {
            return {
                ...state, 
                isGamePrizeFinished: true,
                pickedStarPrize: action.payload,
            }
        },
        setPickedPrizeStar: (state, action) => {
            return {
                ...state, pickedStarPrize: action.payload
            }
        },
        setBonusFromHistory: (state, action) => {
            return {
                ...state,
                pickedStar: action.payload.pickedStar,
                activeBonusGame: [...action.payload.activeBonus],
                isBonusGameFinished: true
            }
        },
        setPrizesFromHistory: (state, action) => {
            return {
                ...state,
                pickedStarPrize: action.payload.pickedStar,
                activeGamePrize: [...action.payload.prizes],
                prizeId: action.payload.id,
                isGamePrizeFinished: action.payload.pickedStar === 0 ? false : true
            }
        },
        setIsVisibleBonus: (state, action) => {
            return {...state, isVisibleBonus: true}
        },
        resetBonus: (state, action) => {
            return {
                ...state,
                pickedStar: 0,
                activeBonusGame: [],
                isBonusGameFinished: false,
                isVisibleBonus: true
            }
        },
        resetPrize: (state, action) => {
            return {
                ...state,
                pickedStarPrize: 0,
                activeGamePrize: [],
                isGamePrizeFinished: false,
                isVisiblePrize: true,
                prizeId: null,
            }
        }
    }
})

export const {
    shuffleBonuses,
    revealBonusResult,
    setBonusFromHistory,
    setIsVisibleBonus,
    resetBonus,
    shufflePrizes,
    revealPrizeResult,
    setPrizesFromHistory,
    setPickedPrizeStar,
    resetPrize
} = addStarSlice.actions

export default addStarSlice.reducer