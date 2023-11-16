import React from "react"

interface IComponents {
	title: string
	onClick?: () => void
}

const Components: React.FC<IComponents> = ({ title, onClick }: IComponents): JSX.Element => {
	return (
		<button
			onClick={onClick}
			className="w-full bg-black rounded-sm text-white font-sans py-2 px-3 hover:bg-red-700 duration-300 mb-2"
			type="submit"
		>
			{title}
		</button>
	)
}

export default Components
