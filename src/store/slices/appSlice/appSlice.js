import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoaded: false,
    isWithdrawPage: false
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
        }
    }
})

export const {
    setIsWithdrawPage,
    setIsApplicationLoaded
} = appSlice.actions

export default appSlice.reducer