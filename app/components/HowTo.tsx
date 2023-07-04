import Image from "next/image";

const HowTo = () => {
	return (
		<section
			id='howto'
			className='border-y-8 border-white bg-lightgreen  p-36 text-center text-6xl font-bold text-white'
		>
			<p className='pb-12'>Cómo participar</p>

			<div className='flex justify-center gap-12'>
				<Image
					src={"/images/Compra.png"}
					alt='Compra'
					width={400}
					height={195}
				/>
				<Image
					src={"/images/Registra.png"}
					alt='Registra'
					width={400}
					height={195}
				/>
				<Image src={"/images/Gana.png"} alt='Premio' width={400} height={195} />
			</div>
		</section>
	);
};

export default HowTo;
