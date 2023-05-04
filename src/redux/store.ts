import {
    combineReducers,
    configureStore,
    PreloadedState,
} from '@reduxjs/toolkit'
import imageReducer from './reducers/imageSlice'

const rootReducer = combineReducers({
    images: imageReducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

export type AppStore = ReturnType<typeof setupStore>

const store: any = setupStore()

export type RootState = ReturnType<typeof store.getState>

export default store
