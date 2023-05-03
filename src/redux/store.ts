import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './reducers/imageSlice'

const store = configureStore({
    reducer: {
        images: imageReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
