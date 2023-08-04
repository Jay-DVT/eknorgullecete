import Image from "next/image";

const Products = () => {
	return (
		<section
			id='products'
			className='border-t-8 border-white bg-primary py-8 text-center text-2xl font-bold text-white md:p-16 md:text-5xl'
		>
			<div>Productos participantes</div>
			<div className='m-5 flex justify-evenly gap-0 rounded-md p-4 md:m-0 md:mt-12 md:justify-center md:gap-24'>
				<Image
					src={"/images/knorr_2.png"}
					alt='Knorr'
					width={300}
					height={300}
					className='w-24 md:w-48'
					quality={100}
				/>
				<Image
					src={"/images/knorr_1.png"}
					alt='Knorr'
					width={300}
					height={300}
					className='w-20 md:w-48'
					quality={100}
				/>
			</div>
		</section>
	);
};

export default Products;
