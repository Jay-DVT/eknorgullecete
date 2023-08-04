import Image from "next/image";

const Rewards = () => {
	return (
		<section
			id='rewards'
			className='h-fit bg-secondarybody bg-cover bg-center bg-no-repeat py-8 text-center text-3xl font-bold text-white md:p-16 md:text-5xl'
		>
			<div>Premios</div>
			<div className='flex justify-center'>
				<div className='m-12 flex w-fit flex-col items-center justify-center gap-3 rounded-md bg-primary p-6'>
					<Image
						src={"/images/premios_1.png"}
						alt='Premios'
						width={600}
						height={529.8}
						quality={100}
						className=''
					/>
					<Image
						src={"/images/premios_2.png"}
						alt='Premios'
						width={600}
						height={166.4}
						quality={100}
						className=''
					/>
				</div>
			</div>
		</section>
	);
};

export default Rewards;
