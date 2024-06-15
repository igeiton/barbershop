import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: '',
        lastName: '',
        phone: '',
        selectedMonth: new Date().getMonth() + 1,
        selectedYear: new Date().getFullYear(),
        isOwner: true,
    },
    reducers: {
        setCurrentUser(state, action) {
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.phone = action.payload.phone;
        },

        setMonth(state, action) {
            state.selectedMonth = action.payload;
        },
        setYear(state, action) {
            state.selectedYear = action.payload;
        },
    },
});

export const { setCurrentUser, setMonth, setYear } = userReducer.actions;

export default userReducer.reducer;
