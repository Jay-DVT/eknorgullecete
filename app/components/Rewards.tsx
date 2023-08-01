import Image from "next/image";

const Rewards = () => {
	return (
		<section
			id='rewards'
			className='h-screen bg-primary p-14 text-center text-6xl font-bold text-white'
		>
			<p className='pb-20'>Premios</p>
			<div className='flex flex-col items-center gap-12'>
				<div className='flex flex-col justify-center gap-60 md:flex-row'>
					<Image
						src={"/images/Group11.png"}
						alt='Premio'
						width={420}
						height={420}
					/>
					<Image
						src={"/images/Group10.png"}
						alt='Premio'
						width={420}
						height={420}
					/>
				</div>
				<Image
					src={"/images/premios_1.png"}
					alt='Premio'
					width={900}
					height={225}
				/>
			</div>
		</section>
	);
};

export default Rewards;
