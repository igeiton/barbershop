import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    },
    reducers: {
        login(state) {
            state.isAuth = true;
        },
    },
});

export const { login } = authReducer.actions;

export default authReducer.reducer;
