import Image from "next/image";
import SignIn from "./modals/SignIn";

const Hero = () => {
	return (
		<section
			id='hero'
			className='h-[100%] w-screen bg-body bg-cover bg-center bg-no-repeat'
		>
			<div className='flex flex-col-reverse items-center justify-center md:h-full md:flex-row md:gap-20 lg:gap-40'>
				<SignIn />
				<Image
					src={"/images/eKnorrgullecete.png"}
					alt='Promo Logo'
					width={743}
					height={630}
					className='m-4 mt-20'
				/>
			</div>
		</section>
	);
};

export default Hero;
