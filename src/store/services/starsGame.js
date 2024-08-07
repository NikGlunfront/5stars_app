import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://glunfront.online/stars-game/api/"

const userPath = "user/"
const balancePath = "balance/"
const gamePath = "game/"

export const starsApi = createApi({
    reducerPath: "starsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Balance', 'Game', 'History', 'Bonus', 'Prize', 'Attempts'],
    endpoints: (builder) => ({
        loginUser: builder.query({
            query: (telegramId) => `${userPath}?dispatch=login&tg_id=${telegramId}`,
            
        }),
        getBalances: builder.query({
            query: (tgId) => `${balancePath}?dispatch=get_balance&tg_id=${tgId}`,
            providesTags:  result => ['Balance']
        }),
        getActiveGame: builder.query({
            query: (tgId) => `${gamePath}?dispatch=get_active&tg_id=${tgId}`,
            providesTags: result => ['Game']
        }),
        addStars: builder.mutation({
            query: (starsData) => ({
                url:  balancePath,
                method: 'POST',
                body: {...starsData, method: 'add'}
            }),
            invalidatesTags: ['Balance', 'History', 'Bonus', 'Prize']
        }),
        calculateGame: builder.mutation({
            query: (gameData) => ({
                url: gamePath,
                method: 'POST',
                body: {...gameData, method: 'calculate'}
            }),
            invalidatesTags: ['Game', 'Balance', 'History', 'Bonus', 'Attempts']
        }),
        createNewGame: builder.mutation({
            query: (newGameData) => ({
                url: gamePath,
                method: "POST",
                body: {...newGameData, method: 'create_new'}
            }),
            invalidatesTags: ['Game']
        }),
        getAllHistoryGames: builder.query({
            query: (tgId) => `${gamePath}?dispatch=get_history_all&tg_id=${tgId}`,
            responseHandler: 'text',
            providesTags: result => ['History']
        }),
        getHistoryTotals: builder.query({
            query: (tgId) => `${gamePath}?dispatch=get_history_totals&tg_id=${tgId}`,
            responseHandler: 'text',
            providesTags: result => ['History']
        }),
        generateHashFromString: builder.mutation({
            query: (stringVal) => `${gamePath}?dispatch=generate_hash&g_string=${stringVal}`
        }),
        getReferral: builder.query({
            query: (tgId) => `${userPath}?dispatch=get_referral&tg_id=${tgId}`,
            providesTags:  result => ['History']
        }),
        swapStars: builder.mutation({
            query: (swapData) => ({
                url: balancePath,
                method: "POST",
                body: {...swapData, method: 'swap'}
            }),
            invalidatesTags: ['Balance', 'History']
        }),
        resetData: builder.mutation({
            query: (resetData) => ({
                url: balancePath,
                method: "POST",
                body: {...resetData, method: 'reset'}
            }),
            invalidatesTags: ['Balance', 'Game', 'History', 'Bonus', 'Attempts']
        }),
        changePp: builder.mutation({
            query: (userData) => ({
                url: balancePath,
                method: "POST",
                body: {...userData, method: 'change_pp'}
            }),
            invalidatesTags: ['Balance', 'Game', 'History']
        }),
        setZeroBalance: builder.mutation({
            query: (userData) => ({
                url: balancePath,
                method: "POST",
                body: {...userData, method: 'zero_balance'}
            }),
            invalidatesTags: ['Balance', 'Game', 'History']
        }),
        setRefPartner: builder.mutation({
            query: (userData) => ({
                url: gamePath,
                method: "POST",
                body: {...userData, method: 'set_partner'}
            })
        }),
        saveBonusGame: builder.mutation({
            query: (bonusData) => ({
                url: balancePath,
                method: "POST",
                body: {...bonusData, method: 'save_bonusgame'}
            })
        }),
        saveAttBonusGame: builder.mutation({
            query: (bonusData) => ({
                url: userPath,
                method: "POST",
                body: {...bonusData, method: 'save_a_bonusgame'}
            })
        }),
        getBonus: builder.query({
            query: (tgId) => `${balancePath}?dispatch=get_bonus&tg_id=${tgId}`,
            providesTags: result => ['Bonus']
        }),
        getAttempts: builder.query({
            query: (tgId) => `${userPath}?dispatch=get_attempts&tg_id=${tgId}`,
            providesTags: result => ['Attempts']
        }),
        getPrize: builder.query({
            query: (tgId) => `${balancePath}?dispatch=get_prize&tg_id=${tgId}`,
            providesTags: result => ['Prize']
        }),
        createPrizeGame: builder.mutation({
            query: (prizeData) => ({
                url: balancePath,
                method: "POST",
                body: {...prizeData, method: 'create_prize'}
            }),
            invalidatesTags: ['Prize']
        }),
        savePrizeWin: builder.mutation({
            query: (prizeData) => ({
                url: balancePath,
                method: "POST",
                body: {...prizeData, method: 'update_prize'}
            }),
            invalidatesTags: ['Bonus']
        }),
        withdraw: builder.mutation({
            query: (prizeData) => ({
                url: balancePath,
                method: "POST",
                body: {...prizeData, method: 'withdraw'}
            }),
            invalidatesTags: ['Balance', 'History']
        }),
        saveAttemptsPrizeWin: builder.mutation({
            query: (prizeData) => ({
                url: userPath,
                method: "POST",
                body: {...prizeData, method: 'update_a_prize'}
            }),
            invalidatesTags: ['Attempts']
        }),
        addTries: builder.mutation({
            query: (triesData) => ({
                url: userPath,
                method: "POST",
                body: {...triesData, method: 'add_tries'}
            }),
            invalidatesTags: ['Attempts', 'History']
        }),
    })
})

export const {
    useLoginUserQuery,
    useAddStarsMutation,
    useGetBalancesQuery,
    useGetActiveGameQuery,
    useCalculateGameMutation,
    useCreateNewGameMutation,
    useGetAllHistoryGamesQuery,
    useGetReferralQuery,
    useGenerateHashFromStringMutation,
    useSwapStarsMutation,
    useResetDataMutation,
    useChangePpMutation,
    useSetRefPartnerMutation,
    useSaveBonusGameMutation,
    useGetBonusQuery,
    useSaveAttBonusGameMutation,
    useGetAttemptsQuery,
    useGetHistoryTotalsQuery,
    useCreatePrizeGameMutation,
    useWithdrawMutation,
    useGetPrizeQuery,
    useSavePrizeWinMutation,
    useAddTriesMutation,
    useSaveAttemptsPrizeWinMutation,
    useSetZeroBalanceMutation
} = starsApi
