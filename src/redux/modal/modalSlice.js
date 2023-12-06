import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    text: ''
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, payload, action) => {
            state.isOpen = true;
            state.text= payload
        },
        closeModal: (state, action) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
