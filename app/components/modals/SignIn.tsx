const SignIn = () => {
	return (
		<div className='h-fit w-fit rounded-3xl border-2 border-white bg-primary/60 text-center text-lg font-thin text-white'>
			<div className='p-12'>
				<p className='text-3xl font-bold'>Inicia sesión para participar</p>
				<p className='p-6'>
					Ingresa tus datos para <br /> iniciar sesión y registrar tu ticket
				</p>
				<form action='' method='post'>
					<div className='flex flex-col gap-4'>
						<div>
							<div className='flex flex-col gap-1 '>
								<label className='text-left' htmlFor='email'>
									CORREO ELECTRÓNICO
								</label>
								<input
									className='rounded-full p-2 text-black'
									type='text'
									name='email'
									id='email'
								/>
							</div>
						</div>
						<div>
							<div className='flex flex-col gap-1'>
								<label className='text-left' htmlFor='phone'>
									NÚMERO DE TELÉFONO
								</label>
								<input
									className='rounded-full p-2 text-black'
									type='text'
									name='phone'
									id='phone'
								/>
							</div>
						</div>
					</div>
					{/* Button submit */}
					<div className='p-4'>
						<button className=' mt-4 rounded-full bg-secondary p-2 px-12 text-primary'>
							Iniciar sesión
						</button>
					</div>
				</form>
				<p>
					¿No tienes cuenta?
					<span className='text-secondary hover:cursor-pointer'>
						{" "}
						Crea una cuenta
					</span>{" "}
				</p>
			</div>
		</div>
	);
};

export default SignIn;
