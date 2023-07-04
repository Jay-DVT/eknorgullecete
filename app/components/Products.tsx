import Image from "next/image";

const Products = () => {
	return (
		<section
			id='products'
			className='bg-primary p-36 text-center text-6xl font-bold text-white'
		>
			<p className='pb-20'>Productos participantes</p>
			<div className='flex flex-col items-center gap-12'>
				<div className='flex justify-center gap-12'>
					<Image
						src={"/images/Products.png"}
						alt='Premio'
						width={420}
						height={420}
					/>
				</div>
			</div>
		</section>
	);
};

export default Products;
