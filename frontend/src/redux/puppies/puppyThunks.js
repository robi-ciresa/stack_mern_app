import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchPuppiesRequest, 
    fetchPuppiesSuccess, 
    fetchPuppiesFail, 
    addPuppy, 
    updatePuppy, 
    deletePuppy,
    fetchPuppyDetailsRequest,
    fetchPuppyDetailsSuccess,
    fetchPuppyDetailsFail 
} from './puppySlice';

export const fetchPuppies = createAsyncThunk(
    'puppies/fetchPuppies',
    async (_, { dispatch }) => {
        try {
            dispatch(fetchPuppiesRequest());
            const response = await fetch('http://localhost:5000/api/puppies');
            const data = await response.json();
            if (response.ok) {
                dispatch(fetchPuppiesSuccess(data));
            } else {
                dispatch(fetchPuppiesFail(data.message || 'Failed to fetch puppies'));
            }
        } catch (error) {
            dispatch(fetchPuppiesFail(error.message || 'Error fetching puppies'));
        }
    }
);

export const fetchPuppyDetails = createAsyncThunk(
    'puppies/fetchPuppyDetails',
    async (id, { dispatch }) => {
        try {
            dispatch(fetchPuppyDetailsRequest());
            const response = await fetch(`http://localhost:5000/api/puppies/${id}`);
            const data = await response.json();
            if (response.ok) {
                dispatch(fetchPuppyDetailsSuccess(data));
                return data;
            } else {
                dispatch(fetchPuppyDetailsFail(data.message || 'Failed to fetch puppy details'));
                throw new Error(data.message || 'Error fetching puppy details');
            }
        } catch (error) {
            dispatch(fetchPuppyDetailsFail(error.message || 'Error fetching puppy details'));
            throw error;
        }
    }
);

export const createPuppy = createAsyncThunk(
    'puppies/createPuppy',
    async (puppyData, { dispatch }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5000/api/puppies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(puppyData),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(addPuppy(data));
            }
            return data;
        } catch (error) {
            throw new Error('Failed to create puppy');
        }
    }
);

export const editPuppy = createAsyncThunk(
    'puppies/editPuppy',
    async ({ id, updatedPuppy }, { dispatch }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/puppies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(updatedPuppy),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updatePuppy(data));
            }
            return data;
        } catch (error) {
            throw new Error('Failed to edit puppy');
        }
    }
);

export const removePuppy = createAsyncThunk(
    'puppies/removePuppy',
    async (id, { dispatch, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`http://localhost:5000/api/puppies/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                dispatch(deletePuppy(id));
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error deleting puppy');
            }
        } catch (error) {
            throw new Error('Error during DELETE request');
        }
    }
);