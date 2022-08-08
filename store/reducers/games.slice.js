import {createSlice} from "@reduxjs/toolkit";

const initialState = {
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addGames: (state, action) => {
            console.log('dispatch');
            state.games.results = [...state.games.results, ...action.payload.results];
            state.games.next = action.payload.next;
            state.games.count = action.payload.count;
        },
        setGames: (state, action) => {
            state.games = action.payload;
        },

    }
})

export const {
    addGames,
    setGames
} = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;
