import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'alerts',
    initialState: {
        isOpen: false,
        data: []
    },
    reducers: {
        addAlert: (state, action) => ({
            ...state,
            isOpen: true,
            data: [...state.data, action.payload],
        }),
        removeAlert: (state) => ({
            ...state,
            isOpen: false,
            data: []
        }),
    }
});

export const { addAlert, removeAlert } = slice.actions;

export const selectAlerts = state => state.alerts.data;
export const selectIsOpen = state => state.alerts.isOpen;

export default slice.reducer;