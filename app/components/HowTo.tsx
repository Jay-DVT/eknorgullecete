import Image from "next/image";

const HowTo = () => {
	return (
		<section
			id='howto'
			className='border-y-8 border-white bg-lightgreen py-8 text-center text-3xl font-bold text-white md:p-16 md:text-5xl'
		>
			<div>Cómo Participar</div>
			<div className='m-8 flex flex-col items-center justify-evenly gap-5 md:flex-row'>
				<div className='flex flex-col items-center gap-4'>
					<Image
						src={"/images/Compra.png"}
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
				<Image
					src={"/images/Registra.png"}
					alt='Registra'
					width={400}
					height={400}
					className='w-60 md:w-96'
				/>
				<div className='flex flex-col items-center gap-4'>
					<Image
						src={"/images/Gana.png"}
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
