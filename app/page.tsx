import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowTo from "./components/HowTo";
import Rewards from "./components/Rewards";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Participation from "./components/modals/Participation";

export default function Home() {
	return (
		<main className=' bg-lightgreen'>
			<div className='z-50'>
				<Participation />
			</div>
			<div className='z-0'>
				<div className='flex h-fit flex-col'>
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
