import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice/gameSlice";

export const store = configureStore({
    reducer: {
        'stargame': gameSlice
    }
})