import { configureStore, combineReducers } from "@reduxjs/toolkit"
import imageSlice from "./slices/imageSlice"
import userSlice from "./slices/userSlice"

const rootReducer = combineReducers({
	user: userSlice.reducer,
	images: imageSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
