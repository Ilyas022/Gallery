/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				authBg: "url('./assets/img/signlogBgImg.jpg')",
				img: "url('./assets/img/image.png')",
			},
			fontFamily: {
				raleway: ["Raleway", "sans-serif"],
				playfair: ["Playfair Display", "serif"],
			},
		},
	},
	plugins: [],
}
