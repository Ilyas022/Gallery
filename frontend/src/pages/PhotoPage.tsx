import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { IImage } from "../models/image"
import { ImageService } from "../services/image.service"
import Button from "../components/Button"
import { useTypedSelector } from "../store/hooks/useTypedSelector"

const PhotoPage: React.FC = (): JSX.Element => {
	const { id } = useParams()
	const userId = useTypedSelector((state) => state.user.user?._id)
	const [image, setImage] = useState<IImage | null>(null)
	const [comment, setComment] = useState<string>("")

	useEffect(() => {
		const getPhoto = async () => {
			if (id) {
				const image = await ImageService.getImage(id)
				setImage(image)
			}
		}

		getPhoto()
	}, [id])

	const handleAddComment = async () => {
		if (id) {
			const data = await ImageService.addComment({ id, comment })
			setImage(data)
			setComment("")
		}
	}

	const handleRemoveComment = async (commentId: string) => {
		if (id) {
			const data = await ImageService.removeComment({ id, commentId })
			setImage(data)
			setComment("")
		}
	}

	return (
		<main className="font-raleway pb-40">
			<div className="flex justify-center gap-20 w-[1132px] px-4 mx-auto">
				{image && <img src={image.url} alt="" className="rounded self-start" />}
				<div className="basis-1/2 p-5 flex flex-col gap-5 bg-white text-black rounded">
					<div className="flex flex-col gap-2">
						{image?.comments &&
							image.comments.length > 0 &&
							image!.comments.map((comment) => {
								return (
									<div
										key={comment._id}
										className={
											comment.author === userId
												? "group hover:bg-black/30 duration-300 relative"
												: ""
										}
									>
										<p>{comment.authorName}</p>
										<p>{comment.text}</p>
										<button
											onClick={() => handleRemoveComment(comment._id)}
											className="group-hover:block group-hover:opacity-100 duration-300 none text-white opacity-0 h-full px-5 absolute top-1/2 -translate-y-1/2 right-0 bg-red-700 hover:bg-red-900"
										>
											Delete
										</button>
									</div>
								)
							})}
					</div>
					<div>
						<textarea
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							name="comment"
							className="w-full py-1 px-3 resize-none border-2 border-solid border-gray-300 rounded-sm outline-0 focus:border-red-700 duration-300"
						></textarea>
						<Button title="Add comment" onClick={handleAddComment} />
					</div>
				</div>
			</div>
		</main>
	)
}

export default PhotoPage
