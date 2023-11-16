import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useActions } from "../store/hooks/useActions"
import { useTypedSelector } from "../store/hooks/useTypedSelector"

const HomePage: React.FC = (): JSX.Element => {
	const { getImages } = useActions()
	const { images } = useTypedSelector((state) => state.images)

	useEffect(() => {
		getImages()
	}, [getImages])

	return (
		<main className="font-raleway pb-40">
			<div className="w-[1132px] px-4 mx-auto grid grid-cols-4 gap-10">
				{images.map(({ _id, url }) => {
					return (
						<Link
							to={`/photo/${_id}`}
							key={_id}
							className="h-40 border border-solid border-black rounded-lg overflow-hidden cursor-pointer"
						>
							<img
								loading="lazy"
								src={url}
								alt="lion"
								className="h-full w-full object-cover object-[50%_35%] hover:scale-105 duration-300 overflow-hidden"
							/>
						</Link>
					)
				})}
			</div>
		</main>
	)
}

export default HomePage
