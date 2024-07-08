import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoaded: false,
    isWithdrawPage: false,
    mainBalance: 0,
    airdropBalance: 0,
    partnershipBalance: 0,
    isPremium: false,
    gamesLeft: 0
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsApplicationLoaded: (state, action) => {
            return {
                ...state, isLoaded: action.payload
            }
        },
        setIsWithdrawPage: (state, action) => {
            return {
                ...state, isWithdrawPage: action.payload
            }
        },
        setMainBalance: (state, action) => {
            return {
                ...state, mainBalance: action.payload
            }
        },
        setAirdropBalance: (state, action) => {
            return {
                ...state, airdropBalance: action.payload
            }
        },
        setPartnershipBalance: (state, action) => {
            return {
                ...state, partnershipBalance: action.payload
            }
        },
        setIsPremium: (state, action) => {
            return {
                ...state, isPremium: action.payload
            }
        },
        setGamesLeft: (state, action) => {
            return {
                ...state, gamesLeft: action.payload
            }
        }
    }
})

export const {
    setIsWithdrawPage,
    setIsApplicationLoaded,
    setMainBalance,
    setAirdropBalance,
    setPartnershipBalance,
    setGamesLeft,
    setIsPremium
} = appSlice.actions

export default appSlice.reducer