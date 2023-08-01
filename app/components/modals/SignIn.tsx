"use client";

import { useState } from "react";
import Input from "react-phone-number-input/input";
import type { E164Number } from "libphonenumber-js";

const SignIn = () => {
	const [value, setValue] = useState<E164Number>();

	return (
		<div className='text-md mx-5 mb-8 h-fit w-fit whitespace-normal rounded-3xl border-2 border-white bg-primary/60 text-center font-thin text-white lg:text-lg'>
			<div className='p-3 md:p-8'>
				<p className='text-2xl font-bold'>REGISTRA TU TICKET</p>
				<p className='p-6 text-sm'>
					Registra tus datos para participar. <br /> Mientras más registres más
					oportunidades tendrás de ganar:
				</p>
				<form action='' method='post'>
					<div className=' flex flex-col gap-4 text-sm'>
						<div>
							<div className='flex flex-col gap-1 '>
								<label className='text-left' htmlFor='email'>
									CORREO ELECTRÓNICO
								</label>
								<input
									className='rounded-full p-2 px-4 text-black'
									type='email'
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
								<Input
									className='rounded-full p-2 px-4 text-black'
									country='MX'
									value={value}
									onChange={setValue}
								/>
							</div>
						</div>
						<div>
							<div className='flex flex-col gap-1'>
								<label className='text-left' htmlFor='folio'>
									FOLIO DEL TICKET DE COMPRA
								</label>
								<input
									className='rounded-full p-2 px-4 text-black'
									type='text'
									name='folio'
									id='folio'
								/>
								<p className='text-left text-xs'>
									* Conserva tu ticket de compra en caso de que ganes uno de los
									premios
								</p>
							</div>
						</div>
						<div>
							<div className='flex flex-col gap-1'>
								<label className='text-left' htmlFor='photo'>
									SUBE TU TICKET
								</label>
								<input
									className='rounded-full p-2 px-4 text-black'
									type='file'
									name='photo'
									id='photo'
								/>
							</div>
						</div>
					</div>
					{/* Button submit */}
					<div className='p-4'>
						<button className=' mt-4 rounded-full bg-secondary p-2 px-12 text-primary'>
							Siguiente
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
