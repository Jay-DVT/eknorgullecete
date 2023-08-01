const DisplayNav = () => {
	return (
		<div className=' z-50 h-screen bg-lightgreen'>
			<div className='flex flex-col'>
				<div className=' flex flex-col gap-10 text-right text-lg font-bold text-primary'>
					<a href='#hero' className='hover-underline-animation'>
						Participa
					</a>
					<a href='#howto' className='hover-underline-animation'>
						Cómo participar
					</a>
					<a href='#rewards' className='hover-underline-animation'>
						Premios
					</a>
					<a href='#products' className='hover-underline-animation'>
						Productos participantes
					</a>
				</div>
			</div>
		</div>
	);
};

export default DisplayNav;
