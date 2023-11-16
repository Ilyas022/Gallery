import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useActions } from "../../store/hooks/useActions"
import { useTypedSelector } from "../../store/hooks/useTypedSelector"
import { useEffect } from "react"
import Button from "../Button"
import { routes } from "../../utils/routes"

type SignUpFields = {
	name: string
	password: string
}

interface IAuthForm {
	title: "Sign up" | "Sign in"
}
const AuthForm: React.FC<IAuthForm> = ({ title }): JSX.Element => {
	const { signInUser, signUpUser } = useActions()
	const navigate = useNavigate()
	const { isLoged } = useTypedSelector((state) => state.user)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFields>()

	useEffect(() => {
		isLoged && navigate(-1)
	}, [isLoged, navigate])

	const isAccountExists = title === "Sign in"
	const onSubmit: SubmitHandler<SignUpFields> = (data) => {
		isAccountExists ? signInUser(data) : signUpUser(data)
		navigate("/")
	}

	return (
		<div className="w-[350px] p-5 bg-white border border-solid border-gray-600 rounded-lg text-black">
			<h2 className="text-center text-red-700 text-3xl font-semibold mb-4">{title}</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<label htmlFor="name" className="inline-block mb-2 hover:cursor-pointer">
						Name
					</label>
					<input
						id="name"
						className="border-2 border-solid border-gray-300 rounded-sm w-full py-1 px-3 outline-0 focus:border-red-700 duration-300"
						{...register("name", {
							minLength: 2,
							required: true,
						})}
					/>
					{errors.name && errors.name.type === "required" && <p>Field is required</p>}
					{errors.name && errors.name.type === "minLength" && <p>Max length exceeded</p>}
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="inline-block mb-2 hover:cursor-pointer">
						Password
					</label>
					<input
						id="password"
						className="border-2 border-solid border-gray-300 rounded-sm w-full py-1 px-3 outline-0 focus:border-red-700"
						type="password"
						{...register("password", {
							minLength: 5,
							required: true,
						})}
					/>
					{errors.password && errors.password.type === "required" && <p>Field is required</p>}
					{errors.password && errors.password.type === "minLength" && <p>Max length exceeded</p>}
				</div>
				<Button title={title} />
				<div className="text-sm font-medium text-center">
					<span className="mr-2">
						{!isAccountExists ? "Already have an account?" : "No account?"}
					</span>

					<Link
						to={!isAccountExists ? routes.SIGNIN_PAGE_URL : routes.SIGNUP_PAGE_URL}
						className="text-red-700 hover:text-black duration-300"
					>
						{!isAccountExists ? "Log in" : "Sign up"}
					</Link>
				</div>
			</form>
		</div>
	)
}

export default AuthForm
