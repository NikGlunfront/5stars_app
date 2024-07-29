import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice/gameSlice";
import appSlice from "./slices/appSlice/appSlice";
import { starsApi } from "./services/starsGame";
import addStarSlice from "./slices/addStarSlice/addStarSlice";
import attemptsSlice from "./slices/attemptsSlice/attemptsSlice";

export const store = configureStore({
    reducer: {
        'stargame': gameSlice,
        'app': appSlice,
        'addStar': addStarSlice,
        'attempts': attemptsSlice,
        'starsApi': starsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(starsApi.middleware)
})