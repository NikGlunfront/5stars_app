import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://glunfront.online/stars-game/api/"

const userPath = "user/"
const balancePath = "user/"

export const starsApi = createApi({
    reducerPath: "starsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        loginUser: builder.query({
            query: (telegramId) => `${userPath}?dispatch=login&tg_id=${telegramId}`
        }),
        addStars: builder.query({
            query: (telegramId, amount, type, actionType) => `${balancePath}?dispatch=update&tg_id=${telegramId}&amount=${amount}&type=${type}&a_type=${actionType}`
        })
    })
})

export const {
    useLoginUserQuery,
    useAddStarsQuery
} = starsApi
