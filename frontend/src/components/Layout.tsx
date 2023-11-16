import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import { routes } from "../utils/routes"
import { useEffect } from "react"

const Layout: React.FC = (): JSX.Element => {
	const navigate = useNavigate()
	const token = localStorage.getItem("token")

	useEffect(() => {
		if (!token) {
			navigate(routes.SIGNIN_PAGE_URL)
		}
	}, [navigate, token])

	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

export default Layout
