import Image from "next/image";
import SignIn from "./modals/SignIn";

const Hero = () => {
	return (
		<section
			id='hero'
			className='h-[100%] bg-body bg-cover bg-center bg-no-repeat'
		>
			<div className='mx-3 flex flex-col-reverse items-center justify-center lg:h-full lg:flex-row '>
				<SignIn />
				<div className='flex flex-shrink justify-center'>
					<Image
						src={"/images/eKnorrgullecete.png"}
						alt='Promo Logo'
						width={743}
						height={630}
						className='m-4 mt-32 w-5/6 sm:mt-20 '
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
