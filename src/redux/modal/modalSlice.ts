import {createSlice} from '@reduxjs/toolkit';

interface IModal {
    isOpen: boolean,
    text: string
}

const initialState: IModal = {
    isOpen: false,
    text: ''
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, payload) => {
            state.isOpen = true;
            // @ts-ignore
            state.text= payload
        },
        closeModal: (state, action) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;



