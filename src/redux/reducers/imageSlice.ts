import {
    AnyAction,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'
import axios from 'axios'
import { Image } from '../../types/Image'
import { RootState } from '../store'

interface ImageState {
    data: Image[]
    activeImage: Image | null
    activeTab: number
    isLoading: boolean
    error: string | null
}

const initialState: ImageState = {
    data: [],
    activeImage: null,
    activeTab: 1,
    isLoading: false,
    error: null,
}

// Define the thunk action creator with createAsyncThunk
export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
    const response = await axios.get<Image[]>(
        'https://agencyanalytics-api.vercel.app/images.json',
        { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    return response.data
})

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setImages: (state, action: PayloadAction<Image[]>) => {
            state.data = action.payload
        },
        setActiveImage: (state, action: PayloadAction<Image>) => {
            state.activeImage = action.payload
        },
        setTab: (state, action: PayloadAction<number>) => {
            state.activeTab = action.payload
        },
        toggleFavorite: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            const index = state.data.findIndex((image) => image.id === id)
            state.data[index].favorited = !state.data[index].favorited
        },
        deleteImage: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            state.data = state.data.filter((image) => image.id !== id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Error fetching images'
            })
    },
})

export type ImageThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export const {
    setImages,
    setActiveImage,
    setTab,
    toggleFavorite,
    deleteImage,
} = imageSlice.actions

export default imageSlice.reducer
