import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://glunfront.online/stars-game/api/"

const userPath = "user/"
const balancePath = "balance/"
const gamePath = "game/"

export const starsApi = createApi({
    reducerPath: "starsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Balance', 'Game'],
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
            invalidatesTags: ['Balance']
        }),
        calculateGame: builder.mutation({
            query: (gameData) => ({
                url: gamePath,
                method: 'POST',
                body: {...gameData, method: 'calculate'}
            })
        })
    })
})

export const {
    useLoginUserQuery,
    useAddStarsMutation,
    useGetBalancesQuery,
    useGetActiveGameQuery,
    useCalculateGameMutation
} = starsApi
