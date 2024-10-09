import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adoptionRequests: [],
    loading: false,
    error: null,
};

const adoptionSlice = createSlice({
    name: 'adoptions',
    initialState,
    reducers: {
        fetchAdoptionRequestsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAdoptionRequestsSuccess: (state, action) => {
            state.adoptionRequests = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchAdoptionRequestsFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createAdoptionRequest: (state, action) => {
            state.adoptionRequests.push(action.payload);
        },
        updateAdoptionRequest: (state, action) => {
            const index = state.adoptionRequests.findIndex(request => request._id === action.payload._id);
            if (index !== -1) {
                state.adoptionRequests[index] = action.payload;
            }
        },
        deleteAdoptionRequest: (state, action) => {
            state.adoptionRequests = state.adoptionRequests.filter(request => request._id !== action.payload);
        },
    },
});

export const { fetchAdoptionRequestsRequest, fetchAdoptionRequestsSuccess, fetchAdoptionRequestsFail, createAdoptionRequest, updateAdoptionRequest, deleteAdoptionRequest } = adoptionSlice.actions;

export default adoptionSlice.reducer;