import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import puppyReducer from './puppies/puppySlice';
import adoptionReducer from './adoptions/adoptionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        puppies: puppyReducer,
        adoptions: adoptionReducer,
    },
});

export default store;
