import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../utils/axios"

const saveToken = (token: string) => localStorage.setItem("token", token)
const removeToken = () => localStorage.removeItem("token")

export const signInUser = createAsyncThunk(
	"auth/login",
	async (params: { name: string; password: string }) => {
		try {
			const res = await axiosInstance.post("/signin", params)
			const token = res.data.token
			if (token) {
				saveToken(token)
			}
			return res.data
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

export const signUpUser = createAsyncThunk(
	"/auth/signup",
	async (params: { name: string; password: string }) => {
		try {
			const res = await axiosInstance.post("/signup", params)
			const token = res.data.token
			if (token) {
				saveToken(token)
			}
			return res.data
		} catch (error) {
			return Promise.reject(error)
		}
	}
)

export const getMe = createAsyncThunk("/auth/me", async () => {
	try {
		const res = await axiosInstance.get("/me")
		return res.data
	} catch (error) {
		removeToken()
		return Promise.reject(error)
	}
})

interface IInitialState {
	error: null | string
	isLoged: boolean
	status: "idle" | "loading" | "fulfiled" | "failed"
	user: { name: string; _id: string } | null
}

const initialState: IInitialState = {
	error: null,
	status: "idle",
	isLoged: false,
	user: {
		name: "",
		_id: "",
	},
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logOutUser: (state) => {
			state.isLoged = false
			state.user = null
		},
	},
	extraReducers(builder) {
		builder
			.addCase(signInUser.pending, (state) => {
				state.status = "loading"
				state.error = null
			})
			.addCase(signInUser.fulfilled, (state, action) => {
				state.status = "fulfiled"
				state.user = action.payload
				state.isLoged = true
			})
			.addCase(signInUser.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message ?? null
			})
			.addCase(signUpUser.pending, (state) => {
				state.status = "loading"
				state.error = null
			})
			.addCase(signUpUser.fulfilled, (state, action) => {
				state.status = "fulfiled"
				state.user = action.payload
				state.isLoged = true
			})
			.addCase(signUpUser.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message ?? null
			})
			.addCase(getMe.pending, (state) => {
				state.status = "loading"
				state.error = null
			})
			.addCase(getMe.fulfilled, (state, action) => {
				state.status = "fulfiled"
				state.user = action.payload
				state.isLoged = true
			})
			.addCase(getMe.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message ?? null
			})
	},
})

export default userSlice
