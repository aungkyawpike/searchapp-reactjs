import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface SuggestionsState {
    suggestions: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SuggestionsState = {
    suggestions: [],
    status: 'idle',
    error: null,
};

export const fetchSuggestions = createAsyncThunk(
    'suggestions/fetchSuggestions',
    async (query: string) => {
        const response = await axios.get(
            'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json'
        );
        return response.data.suggestions || [];
    }
);

const suggestionsSlice = createSlice({
    name: 'suggestions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuggestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.suggestions = action.payload;
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export default suggestionsSlice.reducer;
