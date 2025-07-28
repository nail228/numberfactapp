import {configureStore} from "@reduxjs/toolkit";
import {numberFactReducer} from "../../../../entity";
import {numbersApi} from "../../../../shared/api/numbersApi.ts";

export const store = configureStore({
    reducer: {
        numberFacts: numberFactReducer,
        [numbersApi.reducerPath]: numbersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(numbersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;