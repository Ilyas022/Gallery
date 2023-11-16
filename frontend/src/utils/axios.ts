import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use((config) => {
	const token = window.localStorage.getItem("token")

	config.headers.Authorization = `Bearer ${token}`
	return config
})
