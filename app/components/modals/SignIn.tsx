"use client";

import { useState } from "react";
import Input from "react-phone-number-input/input";
import type { E164Number } from "libphonenumber-js";

const SignIn = () => {
	const [value, setValue] = useState<E164Number>();

	return (
		<div className='mb-8 h-fit w-11/12 whitespace-normal rounded-3xl border-2 border-white bg-primary/60 text-center text-xs font-thin text-white md:w-fit md:text-base lg:text-lg'>
			<div className='p-3 md:p-8'>
				<p className='text-lg font-bold md:text-2xl'>REGISTRA TU TICKET</p>
				<p className='py-4 '>
					Registra tus datos para participar. <br /> Mientras más registres más
					oportunidades tendrás de ganar:
				</p>
				<form action='' method='post'>
					<div className=' flex flex-col gap-4 '>
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
					<button className=' mt-4 rounded-full bg-secondary p-2 p-4 px-12 text-primary'>
						Siguiente
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
