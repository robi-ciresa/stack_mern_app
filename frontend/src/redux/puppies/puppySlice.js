import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    puppies: [],
    puppyDetails: null,  // Per i dettagli di un singolo cucciolo
    loading: false,
    error: null,
};

const puppySlice = createSlice({
    name: 'puppies',
    initialState,
    reducers: {
        // Fetch di tutti i cuccioli
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

        // Fetch di un singolo cucciolo (dettagli)
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

        // Aggiungi un cucciolo
        addPuppy: (state, action) => {
            state.puppies.push(action.payload);
        },

        // Modifica un cucciolo
        updatePuppy: (state, action) => {
            const index = state.puppies.findIndex(puppy => puppy._id === action.payload._id);
            if (index !== -1) {
                state.puppies[index] = action.payload;
            }
        },

        // Elimina un cucciolo
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