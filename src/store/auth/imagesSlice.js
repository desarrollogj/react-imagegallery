import { createSlice } from '@reduxjs/toolkit'

export const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        images: []
    },
    reducers: {
        onLoadImage: (state, { payload }) => {
            state.images = payload
        },
    }
})

export const { onLoadImage } = imagesSlice.actions