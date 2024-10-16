import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdoptionRequestsRequest, fetchAdoptionRequestsSuccess, fetchAdoptionRequestsFail, createAdoptionRequest, updateAdoptionRequest, deleteAdoptionRequest } from './adoptionSlice';

export const fetchAdoptionRequests = createAsyncThunk(
    'adoptions/fetchAdoptionRequests',
    async (_, { dispatch }) => {
        try {
            dispatch(fetchAdoptionRequestsRequest());
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/adoptions`, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request error');
            }
            const data = await response.json();
            dispatch(fetchAdoptionRequestsSuccess(data));
        } catch (error) {
            dispatch(fetchAdoptionRequestsFail(error.message));
        }
    }
);

export const createAdoption = createAsyncThunk(
    'adoptions/createAdoption',
    async (adoptionData, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/adoptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(adoptionData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request error');
            }
            const data = await response.json();
            dispatch(createAdoptionRequest(data));
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const editAdoption = createAsyncThunk(
    'adoptions/editAdoption',
    async ({ id, updatedRequest }, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/adoptions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedRequest),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request error');
            }
            const data = await response.json();
            dispatch(updateAdoptionRequest(data));
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const removeAdoption = createAsyncThunk(
    'adoptions/removeAdoption',
    async (id, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/adoptions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request error');
            }
            dispatch(deleteAdoptionRequest(id));
        } catch (error) {
            console.error(error);
        }
    }
);
