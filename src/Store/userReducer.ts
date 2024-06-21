import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
    name: string;
    lastName: string;
    phone: string;
    selectedMonth: number;
    selectedYear: number;
    isOwner: boolean;
    service: number;
}

const userReducer = createSlice({
    name: 'user',
    initialState: {
        name: '',
        lastName: '',
        phone: '',
        selectedMonth: new Date().getMonth() + 1,
        selectedYear: new Date().getFullYear(),
        isOwner: false,
        service: 1,
    } as IUser,
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

        setService(state, action) {
            state.service = action.payload;
        },
    },
});

export const { setCurrentUser, setMonth, setYear, setService } =
    userReducer.actions;

export default userReducer.reducer;
