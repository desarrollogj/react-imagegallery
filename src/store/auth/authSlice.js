import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',  // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.errorMessage = payload
        },
        createErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    }
})

export const { onLogin, onLogout, createErrorMessage } = authSlice.actions;
