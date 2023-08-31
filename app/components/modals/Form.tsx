"use client";

import { useEffect, useState } from "react";
import Input from "react-phone-number-input/input";
import type { E164Number } from "libphonenumber-js";
import useParticipationStore from "@/app/hooks/participationStore";
import axios from "axios";

interface CountAnimationProps {
	targetNumber: number;
	duration: number;
}

function CountAnimation({ targetNumber, duration }: CountAnimationProps) {
	const [count, setCount] = useState<number>(0);

	function formatNumberWithLeadingZeros(number: number) {
		const roundedNumber = Math.round(number);
		return String(roundedNumber).padStart(4, "0");
	}

	useEffect(() => {
		let startTime: number | null = null;
		let animationFrameId: number;

		function animate(timestamp: number) {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;
			const increment = Math.floor((targetNumber / duration) * progress);

			if (count + increment >= targetNumber) {
				setCount(targetNumber);
				cancelAnimationFrame(animationFrameId);
			} else {
				setCount(count + increment);
				animationFrameId = requestAnimationFrame(animate);
			}
		}

		animationFrameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrameId);
	}, [count, targetNumber, duration]);

	return (
		<div className='py-3'>
			Hasta el momento se han registrado <br />
			<span className='text-lg text-secondary md:text-4xl'>
				{formatNumberWithLeadingZeros(count)}{" "}
			</span>
			<br />
			participaciones
		</div>
	);
}

const Form = () => {
	// variables
	const [phoneNumber, setPhoneNumber] = useState<E164Number>();
	const [mail, setMail] = useState<string>("");
	const [ticket, setTicket] = useState<File>();
	const [terms, setTerms] = useState<boolean>(false);
	const [currentParticipations, setCurrentParticipations] = useState<number>(0);
	const [fullName, setFullName] = useState<string>("");

	// zustand stores
	const openParticipation = useParticipationStore(
		(state) => state.openParticipation
	);
	const setStateMail = useParticipationStore((state) => state.setMail);
	const setStatePhoneNumber = useParticipationStore(
		(state) => state.setPhoneNumber
	);
	const setImageFile = useParticipationStore((state) => state.setImageFile);

	// helpers
	function ValidateEmail(mail: string) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		return false;
	}

	async function getCurrentParticipations() {
		try {
			// get todays date in dd-mm-yyyy format
			const today = new Date();
			const dd = String(today.getDate()).padStart(2, "0");
			const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
			const yyyy = today.getFullYear();
			const todayDate = dd + "-" + mm + "-" + yyyy;
			const httplink =
				"https://api2.dmente.mx/api/get/tickets/check-how-many-tickets-registered-byDate/" +
				todayDate;
			const response = await axios.get(httplink);
			setCurrentParticipations(response.data);
		} catch (error) {
			setCurrentParticipations(0);
		}
	}

	useEffect(() => {
		getCurrentParticipations();
	}, []);

	const handleSubmit = () => {
		// preventdefault
		if (!ticket) return;
		if (!mail) return;
		if (!phoneNumber) return;
		if (fullName == "") return;
		// save data to state
		setImageFile(ticket);
		setStateMail(mail);
		setStatePhoneNumber(phoneNumber.toString());
		setFullName(fullName);
		openParticipation();
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
			!verifyFile(ticket) ||
			!terms ||
			fullName == ""
		);
	};

	return (
		<div className='my-8 h-fit w-11/12 max-w-xl whitespace-normal rounded-3xl border-2 border-white bg-primary/60 text-center text-xs font-thin text-white md:w-fit md:text-base  lg:text-lg'>
			<div className='p-3 md:p-8'>
				<p className='text-lg font-bold md:text-3xl'>REGISTRA TU TICKET</p>
				<CountAnimation targetNumber={currentParticipations} duration={1000} />
				<p className='pb-4 '>
					Registra tus datos y ticket para participar en la promoción
				</p>
				<div className=' flex flex-col gap-4 '>
					<div>
						<div className='flex flex-col'>
							<label className='text-left' htmlFor='email'>
								CORREO ELECTRÓNICO
							</label>
							<input
								className='rounded-full p-[2px] px-4 text-black'
								type='email'
								name='email'
								id='email'
								value={mail}
								onChange={(e) => setMail(e.target.value)}
							/>
							<p className='mt-[2px] whitespace-normal text-left text-xs'>
								* Los premios serán enviados a éste correo electrónico
								proporcionado
							</p>
						</div>
					</div>
					<div>
						<div className='flex flex-col'>
							<label className='text-left' htmlFor='phone'>
								NÚMERO DE TELÉFONO
							</label>
							<Input
								className='rounded-full p-[2px] px-4 text-black'
								country='MX'
								name='phone'
								id='phone'
								value={phoneNumber}
								onChange={setPhoneNumber}
							/>
						</div>
					</div>
					<div>
						<div className='flex flex-col'>
							<label className='text-left' htmlFor='email'>
								NOMBRE COMPLETO
							</label>
							<input
								className='rounded-full p-[2px] px-4 text-black'
								type='text'
								name='fullName'
								id='fullName'
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<div className='flex flex-col'>
							<label className='text-left' htmlFor='photo'>
								SUBE TU TICKET
							</label>
							<input
								className='m-[6px] rounded-full px-4 text-white hover:cursor-pointer'
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
						<p className='whitespace-normal text-left text-xs'>
							* Recuerda que para poder entregarte tus premios es necesario
							tener tu ticket de compra a la mano, el archivo debe ser menor a
							5MB y en formato JPG, PNG o JPEG
						</p>
					</div>
					<div className='flex flex-col items-start '>
						<div className='text-left md:flex md:gap-2'>
							<input
								type='checkbox'
								id='terms'
								onChange={(e) => setTerms(e.target.checked)}
							/>
							<label htmlFor='terms' className=' mx-2 text-sm md:mx-0'>
								Acepto el{" "}
								<a
									href='https://dmente.mx/eknorgullecete/'
									className='underline'
								>
									aviso de privacidad y los términos y condiciones
								</a>
							</label>
						</div>

						<div className='text-left md:flex md:gap-2'>
							<input type='checkbox' id='communication' />
							<label htmlFor='communication' className='mx-2 text-sm md:mx-0'>
								Acepto recibir información y comunicación de Unilever y sus
								marcas
							</label>
						</div>
					</div>
				</div>
				{/* Button submit */}
				<button
					className=' z-0 my-2 rounded-full bg-secondary p-2 px-4 text-primary disabled:cursor-not-allowed disabled:opacity-50 md:mt-4 md:px-14'
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

export default Form;
