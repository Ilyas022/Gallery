import { Helmet, HelmetProvider } from "react-helmet-async"
import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { useEffect } from "react"
import { useActions } from "./store/hooks/useActions"
import PhotoPage from "./pages/PhotoPage"
import { routes } from "./utils/routes"

const App: React.FC = (): JSX.Element => {
	const { getMe } = useActions()
	const { pathname } = useLocation()
	const path = pathname.split("/", 2)[1]
	const title = path ? path[0].toUpperCase() + path.slice(1) : "Home"

	useEffect(() => {
		getMe()
	}, [getMe])

	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Routes>
				<Route path={routes.SIGNIN_PAGE_URL} element={<SignInPage />} />
				<Route path={routes.SIGNUP_PAGE_URL} element={<SignUpPage />} />
				<Route path={routes.HOME_PAGE_URL} element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path={`${routes.PHOTO_PAGE_URL}/:id`} element={<PhotoPage />} />
				</Route>
			</Routes>
		</HelmetProvider>
	)
}

export default App
