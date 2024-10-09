import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchUserFromToken, updateUserPassword, fetchUserAdoptions } from './authThunks';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        token: localStorage.getItem('token') || null, // Il token è prelevato dal localStorage solo all'inizializzazione
        adoptions: { distanceAdoptions: [], fullAdoptions: [] }, // Inizializzazione per adozioni
        loading: false,
        error: null,
    },
    reducers: {
        loginRequest(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload.user; // Salva le info utente
            state.token = action.payload.token;   // Salva il token nello stato
            console.log('Token salvato nello stato:', action.payload.token);
            localStorage.setItem('token', action.payload.token); // Salva anche nel localStorage
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.userInfo = null;
            state.token = null; // Resetta anche il token
            state.adoptions = { distanceAdoptions: [], fullAdoptions: [] }; // Resetta anche le adozioni
            localStorage.removeItem('token'); // Rimuovi il token dal localStorage al logout
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null; // Resetta gli errori
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); // Salva il token in localStorage
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Recupero utente dal token
        builder.addCase(fetchUserFromToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserFromToken.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload; // Salva le info utente
        });
        builder.addCase(fetchUserFromToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Gestisci l'errore
        });

        // Aggiornamento password
        builder.addCase(updateUserPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserPassword.fulfilled, (state) => {
            state.loading = false;
            state.error = null; // Rimuove gli errori in caso di successo
        });
        builder.addCase(updateUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Imposta l'errore
        });

        // Recupero adozioni utente
        builder.addCase(fetchUserAdoptions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserAdoptions.fulfilled, (state, action) => {
            state.loading = false;
            state.adoptions = action.payload; // Salva le adozioni
        });
        builder.addCase(fetchUserAdoptions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Gestione dell'errore
        });
    },
});

export const { loginRequest, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;