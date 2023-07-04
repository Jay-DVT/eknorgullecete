import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["700", "500"],
	subsets: ["latin-ext"],
});

export const metadata = {
	title: "Eknorgullécete",
	description: "Canjea tus tickets por premios",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
