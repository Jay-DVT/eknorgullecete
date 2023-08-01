import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowTo from "./components/HowTo";
import Rewards from "./components/Rewards";
import Products from "./components/Products";
import Footer from "./components/Footer";
import DisplayNav from "./components/DisplayNav";

export default function Home() {
	return (
		<main className='w-screen bg-lightgreen'>
			{/* <DisplayNav /> */}
			<div className='z-0'>
				<div className='h-screen'>
					<Navbar />
					<Hero />
				</div>
				<HowTo />
				<Rewards />
				<Products />
				<Footer />
			</div>
		</main>
	);
}
