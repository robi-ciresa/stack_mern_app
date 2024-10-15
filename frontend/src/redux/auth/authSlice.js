import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchUserFromToken, updateUserPassword, fetchUserAdoptions } from './authThunks';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        token: localStorage.getItem('token') || null,
        adoptions: { distanceAdoptions: [], fullAdoptions: [] },
        loading: false,
        error: null,
    },
    reducers: {
        loginRequest(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.token = action.payload.token; 
            console.log('Token salvato nello stato:', action.payload.token);
            localStorage.setItem('token', action.payload.token);
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.userInfo = null;
            state.token = null;
            state.adoptions = { distanceAdoptions: [], fullAdoptions: [] };
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchUserFromToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserFromToken.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        });
        builder.addCase(fetchUserFromToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateUserPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserPassword.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(updateUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchUserAdoptions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserAdoptions.fulfilled, (state, action) => {
            state.loading = false;
            state.adoptions = action.payload;
        });
        builder.addCase(fetchUserAdoptions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; 
        });
    },
});

export const { loginRequest, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;