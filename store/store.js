import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from 'redux';
import {gamesReducer} from "./reducers/games.slice";
import {searchSettingsReducer} from "./reducers/searchSettings.slice";

const rootReducer = combineReducers({
    gamesReducer,
    searchSettingsReducer
})

export const store = configureStore({
    reducer: rootReducer
});
