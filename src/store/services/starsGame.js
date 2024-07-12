import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://glunfront.online/stars-game/api/"

const userPath = "user/"
const balancePath = "balance/"
const gamePath = "game/"

export const starsApi = createApi({
    reducerPath: "starsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Balance', 'Game', 'History'],
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
                body: starsData
            }),
            invalidatesTags: ['Balance', 'History']
        }),
        calculateGame: builder.mutation({
            query: (gameData) => ({
                url: gamePath,
                method: 'POST',
                body: {...gameData, method: 'calculate'}
            }),
            invalidatesTags: ['Game', 'Balance', 'History']
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
        generateHashFromString: builder.mutation({
            query: (stringVal) => `${gamePath}?dispatch=generate_hash&g_string=${stringVal}`
        }),
        getReferral: builder.query({
            query: (tgId) => `${userPath}?dispatch=get_referral&tg_id=${tgId}`
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
            invalidatesTags: ['Balance', 'Game', 'History']
        }),
        changePp: builder.mutation({
            query: (userData) => ({
                url: balancePath,
                method: "POST",
                body: {...userData, method: 'change_pp'}
            }),
            invalidatesTags: ['Balance', 'Game', 'History']
        })
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
    useChangePpMutation
} = starsApi
