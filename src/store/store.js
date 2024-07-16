import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice/gameSlice";
import appSlice from "./slices/appSlice/appSlice";
import { starsApi } from "./services/starsGame";
import addStarSlice from "./slices/addStarSlice/addStarSlice";

export const store = configureStore({
    reducer: {
        'stargame': gameSlice,
        'app': appSlice,
        'addStar': addStarSlice,
        'starsApi': starsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(starsApi.middleware)
})