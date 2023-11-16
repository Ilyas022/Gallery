import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../utils/axios"
import { IImage } from "../../models/image"

interface IInitialState {
	error: null | string
	isLoged: boolean
	status: "idle" | "loading" | "fulfiled" | "failed"
	images: IImage[] | []
}

const initialState: IInitialState = {
	error: null,
	status: "idle",
	isLoged: false,
	images: [],
}
export const getImages = createAsyncThunk("posts/fetchPosts", async () => {
	const res = await axiosInstance.get("/photos")
	return res.data
})
export const getImageById = createAsyncThunk("posts/fetchPosts", async (id: string) => {
	const res = await axiosInstance.get(`/photos/${id}`)
	return res.data
})

const imageSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getImages.pending, (state) => {
				state.status = "loading"
				state.error = null
			})
			.addCase(getImages.fulfilled, (state, action) => {
				state.status = "fulfiled"
				state.images = action.payload
			})
			.addCase(getImages.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message ?? null
			})
	},
})

export default imageSlice
