import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowTo from "./components/HowTo";
import Rewards from "./components/Rewards";
import Products from "./components/Products";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<main className='bg-lightgreen'>
			<div className='h-screen'>
				<Navbar />
				<Hero />
			</div>
			<HowTo />
			<Rewards />
			<Products />
			<Footer />
		</main>
	);
}
