import { axiosInstance } from "../utils/axios"

export const ImageService = {
	async getImages() {
		const res = await axiosInstance.get("/photos", {})

		return res.data
	},

	async getImage(id: string) {
		const res = await axiosInstance.get(`/photos/${id}`)
		return res.data
	},

	async addComment({ id, comment }: { id: string; comment: string }) {
		const res = await axiosInstance.post(`/comment/${id}`, { text: comment })
		return res.data
	},

	async removeComment({ id, commentId }: { id: string; commentId: string }) {
		const res = await axiosInstance.delete(`/comment/${id}`, {
			data: {
				commentId,
			},
		})
		return res.data
	},
}
