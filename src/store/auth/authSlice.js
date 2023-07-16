import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',  // 'authenticated', 'not-authenticated'
        user: {},
        images: [],
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'
            state.user = payload
            state.images = []
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.images = []
            state.errorMessage = payload
        },
        createErrorMessage: (state) => {
            state.errorMessage = undefined
        },
        onLoadImages: (state, { payload }) => {
            state.images = payload
        }
    }
})

export const { onChecking, onLogin, onLogout, onLoadImages, createErrorMessage } = authSlice.actions;
