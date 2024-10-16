import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFail, logout } from './authSlice';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials, { dispatch }) => {
        try {
            dispatch(loginRequest());
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                dispatch(loginSuccess(data));
                return data;
            } else {
                dispatch(loginFail(data.message || 'Login error'));
            }
        } catch (error) {
            dispatch(loginFail(error.message || 'Login failed'));
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    dispatch(logout());
});

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userCredentials, { dispatch }) => {
        try {
            dispatch(loginRequest());
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                dispatch(loginSuccess(data));
            } else {
                dispatch(loginFail(data.message || 'Registration error'));
            }
        } catch (error) {
            dispatch(loginFail(error.message || 'Registration failed'));
        }
    }
);

export const fetchUserFromToken = createAsyncThunk(
    'auth/fetchUserFromToken',
    async (_, { getState }) => {
        const { auth } = getState();
        const token = auth.token; 

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching user');
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'auth/updateUserPassword',
    async (passwords, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(passwords),
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating password');
        }
    }
);

export const fetchUserAdoptions = createAsyncThunk(
    'auth/fetchUserAdoptions',
    async (_, { getState }) => {
        const { auth } = getState();
        const token = auth.token;

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/adoptions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Adoption Data from API:", data);
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching adoptions');
        }
    }
);