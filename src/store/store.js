import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice/gameSlice";
import appSlice from "./slices/appSlice/appSlice";
import { starsApi } from "./services/starsGame";

export const store = configureStore({
    reducer: {
        'stargame': gameSlice,
        'app': appSlice,
        'starsApi': starsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(starsApi.middleware)
})