import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoaded: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsApplicationLoaded: (state, action) => {
            return {
                ...state, isLoaded: action.payload
            }
        }
    }
})

export const {
    setIsApplicationLoaded
} = appSlice.actions

export default appSlice.reducer