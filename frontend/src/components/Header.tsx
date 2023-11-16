import { Link, useNavigate } from "react-router-dom"
import { useActions } from "../store/hooks/useActions"
import { useTypedSelector } from "../store/hooks/useTypedSelector"
import { routes } from "../utils/routes"

const Header: React.FC = (): JSX.Element => {
	const { logOutUser } = useActions()
	const navigate = useNavigate()
	const name = useTypedSelector((state) => state.user.user?.name)
	return (
		<header className="bg-black/30 mb-10">
			<div className="flex items-center justify-between max-w-[1000px] p-5 mx-auto">
				<Link to={routes.HOME_PAGE_URL} className="text-2xl hover:text-white/75 duration-300">
					Photo gallery
				</Link>
				<div className="flex items-center gap-5">
					<p>Hello, {name}!</p>
					<button
						className="py-2 px-4 bg-red-700 border-2 border-solid border-black rounded hover:bg-red-900 duration-300"
						onClick={() => {
							logOutUser()
							localStorage.removeItem("token")
							navigate(routes.SIGNIN_PAGE_URL)
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
