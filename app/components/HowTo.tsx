import Image from "next/image";

const HowTo = () => {
	return (
		<section
			id='howto'
			className='border-y-8 border-white bg-primary py-8 text-center text-3xl font-bold text-white md:p-16 md:text-5xl'
		>
			<div>Cómo Participar</div>
			<div className='my-8 flex flex-col items-center justify-evenly gap-7 md:flex-row md:gap-5'>
				<div className='flex flex-col items-center gap-4'>
					<Image
						src={"/images/Compra_2.png"}
						alt='Compra'
						width={400}
						height={400}
						className='w-60 md:w-96'
					/>
					<div className='flex'>
						<Image
							src={"/images/knorr_2.png"}
							alt='Knorr'
							width={200}
							height={200}
							className='w-20 md:w-24'
							quality={100}
						/>
						<Image
							src={"/images/knorr_1.png"}
							alt='Knorr'
							width={200}
							height={200}
							className='w-20 md:w-24'
							quality={100}
						/>
					</div>
				</div>
				<div className='flex flex-col items-center gap-4'>
					<Image
						src={"/images/Registra_2.png"}
						alt='Registra'
						width={400}
						height={400}
						className='w-60 md:w-96'
					/>
				</div>
				<div className='flex flex-col items-center gap-4'>
					<Image
						src={"/images/Gana_2.png"}
						alt='Gana'
						width={400}
						height={400}
						className='w-60 md:w-96'
					/>
					<Image
						src={"/images/premios_1.png"}
						alt='Premios'
						width={300}
						height={300}
						className='w-48 md:w-48'
					/>
				</div>
			</div>
		</section>
	);
};

export default HowTo;
