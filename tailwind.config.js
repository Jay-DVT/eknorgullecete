/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#167C42",
				secondary: "#FCE52C",
				lightgreen: "#C3D648",
			},
			backgroundImage: {
				body: "url('/images/background01.jpg')",
			},
		},
	},
	plugins: [],
};
