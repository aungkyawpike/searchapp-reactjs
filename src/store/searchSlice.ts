import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Highlight {
    BeginOffset: number;
    EndOffset: number;
}

interface DocumentTitle {
    Text: string;
    Highlights: Highlight[];
}

interface DocumentExcerpt {
    Text: string;
    Highlights: Highlight[];
}

interface SearchResult {
    DocumentId: string;
    DocumentTitle: DocumentTitle;
    DocumentExcerpt: DocumentExcerpt;
    DocumentURI: string;
}

export interface SearchState {
    results: SearchResult[];
    totalNumberOfResults: number;
    page: number;
    pageSize: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SearchState = {
    results: [],
    totalNumberOfResults: 0,
    page: 1,
    pageSize: 10,
    status: 'idle',
    error: null,
};

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (query: string) => {
        const response = await axios.get(
            'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json'
        );
        return response.data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload.ResultItems;
                state.totalNumberOfResults = action.payload.TotalNumberOfResults;
                state.page = action.payload.Page;
                state.pageSize = action.payload.PageSize;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export default searchSlice.reducer;
