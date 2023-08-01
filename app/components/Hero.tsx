import Image from "next/image";
import SignIn from "./modals/SignIn";

const Hero = () => {
	return (
		<section
			id='hero'
			className='h-screen w-screen bg-body bg-cover bg-center bg-no-repeat'
		>
			<div className='flex h-full flex-col items-center justify-center gap-40 md:flex-row'>
				<SignIn />
				<Image
					src={"/images/eKnorrgullecete.png"}
					alt='Promo Logo'
					width={743}
					height={630}
				/>
			</div>
		</section>
	);
};

export default Hero;
