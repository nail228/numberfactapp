import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {NumberFactEntity, NumberFactState} from "../types/numberTypes.ts";

const initialState: NumberFactState = {
    number: '',
    type: 'trivia',
    isRandom: false,
    result: null,
    error: null,
    currentPage: 'home',
    lastQuery: null,
    settings: {
        useFragment: false,
        notFoundAction: 'default',
        minRange: 1,
        maxRange: 100,
    },
};

export const numberFactSlice = createSlice({
    name: 'numberFacts',
    initialState,
    reducers: {
        setNumber: (state, action: PayloadAction<string>) => {
            state.number = action.payload;
            state.error = null;
        },
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        setIsRandom: (state, action: PayloadAction<boolean>) => {
            state.isRandom = action.payload;
            if (action.payload) {
                state.number = '';
                state.error = null;
            }
        },
        setResult: (state, action: PayloadAction<NumberFactEntity>) => {
            state.result = action.payload.fact;
            state.lastQuery = action.payload;
            state.currentPage = 'result';
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        navigateToHome: (state) => {
            state.currentPage = 'home';
        },
        updateSettings: (state, action: PayloadAction<Partial<NumberFactState['settings']>>) => {
            state.settings = { ...state.settings, ...action.payload };
        },
        resetState: () => initialState,
    },
});

export const numberFactActions = numberFactSlice.actions;
export const numberFactReducer = numberFactSlice.reducer;
