import Image from "next/image";

const Products = () => {
	return (
		<section
			id='products'
			className='bg-primary p-36 text-center text-6xl font-bold text-white'
		>
			<p className='pb-20'>
				Productos <br className='block md:hidden' /> participantes
			</p>
			<div className='flex flex-col items-center gap-12'>
				<div className='flex justify-center gap-12'>
					<Image
						src={"/images/knorr_1.png"}
						alt='Premio'
						width={720}
						height={567}
					/>
				</div>
			</div>
		</section>
	);
};

export default Products;
