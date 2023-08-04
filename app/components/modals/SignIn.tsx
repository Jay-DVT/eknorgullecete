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
		<div className='py-5'>
			Hasta el momento se han registrado <br />
			<span className='text-lg text-secondary md:text-4xl'>
				{formatNumberWithLeadingZeros(count)}{" "}
			</span>
			<br />
			participaciones
		</div>
	);
}

const SignIn = () => {
	const [phoneNumber, setPhoneNumber] = useState<E164Number>();
	const [mail, setMail] = useState<string>("");
	const [ticket, setTicket] = useState<File>();

	const openParticipation = useParticipationStore(
		(state) => state.toggleParticipation
	);
	const setStateMail = useParticipationStore((state) => state.setMail);
	const setStatePhoneNumber = useParticipationStore(
		(state) => state.setPhoneNumber
	);

	function ValidateEmail(mail: string) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		return false;
	}

	const currentParticipations = 122;

	const handleSubmit = () => {
		// TODO
		// preventdefault
		if (!ticket) return;
		console.log(ticket);
		if (!mail) return;
		console.log(mail);
		if (!phoneNumber) return;
		console.log(phoneNumber);
		// send data to backend
		setStateMail(mail);
		setStatePhoneNumber(phoneNumber.toString());
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
			!verifyFile(ticket)
		);
	};

	return (
		<div className='mb-8 h-fit w-11/12 max-w-xl whitespace-normal rounded-3xl border-2 border-white bg-primary/60 text-center text-xs font-thin text-white md:w-fit md:text-base lg:text-lg'>
			<div className='p-3 md:p-8'>
				<p className='text-lg font-bold md:text-3xl'>REGISTRA TU TICKET</p>
				<CountAnimation targetNumber={currentParticipations} duration={1000} />
				<p className='pb-4 '>
					Registra tus datos y ticket para participar
					<br />
					Mientras más tickets registres, <br /> más oportunidades tienes de
					ganar
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
						<p className='whitespace-normal text-left text-xs'>
							* Conserva tu ticket de compra en caso de que ganes uno de los
							premios, el archivo debe ser menor a 5MB y en formato JPG, PNG o
							JPEG
						</p>
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

export default SignIn;
