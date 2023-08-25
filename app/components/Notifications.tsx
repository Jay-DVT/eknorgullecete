const Notifications = () => {
	const today = new Date();
	console.log(today.getMonth());
	return today.getMonth() != 8 ? (
		<div className='absolute h-fit w-full bg-red-600 opacity-90'>
			<div className='text-center '>
				Esta promoción solo es válida del 1 al 30 de septiembre
			</div>
		</div>
	) : (
		<div className='absolute h-2 w-full bg-secondary'></div>
	);
};

export default Notifications;
