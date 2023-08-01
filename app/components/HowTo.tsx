import Image from "next/image";

const HowTo = () => {
	return (
		<section
			id='howto'
			className='border-y-8 border-white bg-lightgreen py-8 text-center text-3xl font-bold text-white md:p-16 md:text-5xl'
		>
			<div>Cómo Participar</div>
			<div className='m-8 flex flex-col items-center gap-5'>
				<div className='flex flex-col items-center gap-2'>
					<Image
						src={"/images/Compra.png"}
						alt='Compra'
						width={250}
						height={250}
					/>
					<div className='flex'>
						<Image
							src={"/images/knorr_2.png"}
							alt='Knorr'
							width={60}
							height={60}
						/>
						<Image
							src={"/images/knorr_1.png"}
							alt='Knorr'
							width={60}
							height={60}
						/>
					</div>
				</div>
				<Image
					src={"/images/Registra.png"}
					alt='Registra'
					width={250}
					height={250}
				/>
				<div className='flex flex-col items-center gap-2'>
					<Image src={"/images/Gana.png"} alt='Gana' width={250} height={250} />
					<Image
						src={"/images/premios_1.png"}
						alt='Premios'
						width={200}
						height={200}
					/>
				</div>
			</div>
		</section>
	);
};

export default HowTo;
