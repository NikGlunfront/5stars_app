import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice/gameSlice";
import appSlice from "./slices/appSlice/appSlice";

export const store = configureStore({
    reducer: {
        'stargame': gameSlice,
        'app': appSlice
    }
})