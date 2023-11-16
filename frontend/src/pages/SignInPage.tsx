import AuthForm from "../components/auth/AuthForm"

const SignInPage: React.FC = (): JSX.Element => {
	return (
		<main className="h-screen w-screen bg-authBg bg-no-repeat bg-cover font-raleway">
			<div className="absolute top-0 left-0 w-full h-full bg-gray-800/60 flex justify-center items-center">
				<div className="flex w-[70%] gap-20">
					<div className="basis-1/2">
						<h1 className="font-playfair tracking-wide font-bold text-8xl mb-8">Gallery app</h1>
						<div className="ml-2 py-1 px-3 bg-red-700 rounded inline-block mb-5">
							Choose your favourite picture
						</div>
						<p className="ml-2 w-2/3">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi facere fuga, quam id
							quis unde delectus aperiam repellendus dolores vero.
						</p>
					</div>
					<AuthForm title="Sign in" />
				</div>
			</div>
		</main>
	)
}

export default SignInPage
