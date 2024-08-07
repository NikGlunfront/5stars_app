import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoaded: false,
    isWithdrawPage: false,
    mainBalance: 0,
    airdropBalance: 0,
    partnershipBalance: 0,
    partnershipBalanceAirdrop: 0,
    partnershipBalanceUsdt: 0.0,
    isPremium: false,
    isMainBalanceLoading: false,
    gamesLeft: 0,
    referralsCount: 0,
    activePartnerBalance: 'star',
    ref: '',
    isLogoLoading: true
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
        setIsLogoLoadingFalse: (state, action) => {
            return {
                ...state, isLogoLoading: false
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
        setPartnershipBalanceUsdt: (state, action) => {
            return {
                ...state, partnershipBalanceUsdt: parseFloat(action.payload)
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
        },
        setReferralsCount: (state, action) => {
            return {...state, referralsCount: action.payload}
        },
        setActivePartnerBalance: (state, action) => {
            return {...state, activePartnerBalance: action.payload}
        },
        setPBalanceAirdrop: (state, action) => {
            return {...state, partnershipBalanceAirdrop: action.payload}
        },
        setRefString: (state, action) => {
            return {
                ...state,  ref: action.payload
            }
        },
        setIsMainBalanceLoading: (state, action) => {
            return  {
                ...state, isMainBalanceLoading: action.payload
            }
        }
    }
})

export const {
    setIsWithdrawPage,
    setIsApplicationLoaded,
    setMainBalance,
    isLogoLoading,
    setAirdropBalance,
    setPartnershipBalance,
    setGamesLeft,
    setIsPremium,
    setReferralsCount,
    setActivePartnerBalance,
    setPBalanceAirdrop,
    setRefString,
    setPartnershipBalanceUsdt,
    setIsMainBalanceLoading,
    setIsLogoLoadingFalse
} = appSlice.actions

export default appSlice.reducer