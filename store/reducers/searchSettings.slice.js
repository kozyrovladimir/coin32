import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    platform: null,
    ordering: null,
    searchText: null,
}

export const searchSettingsSlice = createSlice({
    name: 'search-settings',
    initialState,
    reducers: {
        setPlatform: (state, action) => {
            state.platform = action.payload
        },
        setOrdering: (state, action) => {
            state.ordering = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        resetFilters: state => {
            state = initialState
        }
    }
})

export const {
    setPlatform,
    setOrdering,
    setSearchText,
    resetFilters
} = searchSettingsSlice.actions;

export const searchSettingsReducer = searchSettingsSlice.reducer;
