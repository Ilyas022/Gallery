import { getImages, getImageById } from "./slices/imageSlice.ts"

import userSlice, { signInUser, signUpUser, getMe } from "./slices/userSlice.ts"

const rootActions = {
	...userSlice.actions,
	signInUser,
	signUpUser,
	getMe,
	getImages,
	getImageById,
}

export default rootActions
