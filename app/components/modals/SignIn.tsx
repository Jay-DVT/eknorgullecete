"use client";

import { useState } from "react";
import Input from "react-phone-number-input/input";
import type { E164Number } from "libphonenumber-js";
import axios from "axios";

const SignIn = () => {
	const [phoneNumber, setPhoneNumber] = useState<E164Number>();
	const [mail, setMail] = useState<string>("");
	const [ticket, setTicket] = useState<File>();

	function ValidateEmail(mail: string) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		return false;
	}

	const handleSubmit = () => {
		// preventdefault

		//phone number
		console.log(phoneNumber);
		//mail

		console.log(mail);
	};

	function verifyFile(file: File) {
		const validTypes = ["image/jpeg", "image/jpg", "image/png"];
		if (validTypes.indexOf(file.type) === -1) {
			return false;
		}
		return true;
	}

	const disableUpload = () => {
		return (
			!phoneNumber ||
			phoneNumber.toString().length != 13 ||
			!mail ||
			!ValidateEmail(mail) ||
			!ticket ||
			!verifyFile(ticket)
		);
	};

	return (
		<div className='mb-8 h-fit w-11/12 whitespace-normal rounded-3xl border-2 border-white bg-primary/60 text-center text-xs font-thin text-white md:w-fit md:text-base lg:text-lg'>
			<div className='p-3 md:p-8'>
				<p className='text-lg font-bold md:text-2xl'>REGISTRA TU TICKET</p>
				<p className='py-4 '>
					Registra tus datos para participar. <br /> Mientras más registres más
					oportunidades tendrás de ganar:
				</p>
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
								value={mail}
								onChange={(e) => setMail(e.target.value)}
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
								name='phone'
								id='phone'
								value={phoneNumber}
								onChange={setPhoneNumber}
							/>
						</div>
					</div>
					<div>
						<div className='flex flex-col gap-1'>
							<label className='text-left' htmlFor='photo'>
								SUBE TU TICKET
							</label>
							<input
								className='rounded-full p-2 px-4 text-white hover:cursor-pointer'
								type='file'
								name='photo'
								id='photo'
								onChange={(e) => {
									if (e.target.files) {
										const file = e.target.files[0];
										setTicket(file);
									}
								}}
							/>
						</div>
						<p className='hidden text-left text-xs'>
							* Conserva tu ticket de compra en caso de que ganes uno de los
							premios, el archivo debe ser menor a 5MB y en formato JPG, PNG o
							JPEG
						</p>
					</div>
				</div>
				{/* Button submit */}
				<button
					className=' mt-4 rounded-full bg-secondary p-2 px-4 text-primary disabled:cursor-not-allowed disabled:opacity-50 md:px-14'
					disabled={disableUpload()}
					onClick={() => {
						handleSubmit();
					}}
				>
					Siguiente
				</button>
			</div>
		</div>
	);
};

export default SignIn;
