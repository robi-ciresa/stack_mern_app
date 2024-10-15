import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    puppies: [],
    puppyDetails: null,
    loading: false,
    error: null,
};

const puppySlice = createSlice({
    name: 'puppies',
    initialState,
    reducers: {
        fetchPuppiesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPuppiesSuccess: (state, action) => {
            state.puppies = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchPuppiesFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        fetchPuppyDetailsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPuppyDetailsSuccess: (state, action) => {
            state.puppyDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchPuppyDetailsFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        addPuppy: (state, action) => {
            state.puppies.push(action.payload);
        },

        updatePuppy: (state, action) => {
            const index = state.puppies.findIndex(puppy => puppy._id === action.payload._id);
            if (index !== -1) {
                state.puppies[index] = action.payload;
            }
        },

        deletePuppy: (state, action) => {
            state.puppies = state.puppies.filter(puppy => puppy._id !== action.payload);
        },
    },
});

export const { 
    fetchPuppiesRequest, 
    fetchPuppiesSuccess, 
    fetchPuppiesFail, 
    fetchPuppyDetailsRequest, 
    fetchPuppyDetailsSuccess, 
    fetchPuppyDetailsFail, 
    addPuppy, 
    updatePuppy, 
    deletePuppy 
} = puppySlice.actions;

export default puppySlice.reducer;