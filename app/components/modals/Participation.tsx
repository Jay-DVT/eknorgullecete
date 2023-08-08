"use client";
import Image from "next/image";
import useParticipationStore from "@/app/hooks/participationStore";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import axios from "axios";

const Participation = () => {
	// TODO: Remove this testReward and testRewardImage
	const [mail, setMail] = useState<string>("");
	const [participationNumber, setParticipationNumber] = useState<number>(0);
	const [reward, setReward] = useState<string>("");
	const testRewardImage = "/images/premios_1.png";

	const [loading, setLoading] = useState<boolean>(true);

	// stores
	// Modal Management
	const participation = useParticipationStore(
		(state) => state.isParticipationOpen
	);
	const closeParticipation = useParticipationStore(
		(state) => state.closeParticipation
	);

	// Request information
	const Mail = useParticipationStore((state) => state.mail);
	const PhoneNumber = useParticipationStore((state) => state.phoneNumber);
	const ParticpationNumber = useParticipationStore(
		(state) => state.participationNumber
	);

	const makePostCall = async (): Promise<[number, string]> => {
		console.log("making post call");

		// TODO make POST call with proper content
		// dummy wait time
		await new Promise((resolve) => setTimeout(resolve, 2000));
		// TODO change this to the actual call
		async function getCurrentParticipations() {
			try {
				const response = await axios.get(
					// TODO wait for CORS headers to be set
					"http://3.231.86.130:3000/api/get/tickets/check-how-many-tickets-registered-byDate/07-08-2023"
				);
				console.log("current participaciones", response.data);
				return response.data + 1;
			} catch (error) {
				console.log("Failed to get current participations");
				const response = await axios.get(
					"https://www.random.org/integers/?num=1&min=1&max=120&col=1&base=10&format=plain&rnd=new"
				);
				return response.data + 1;
			}
		}
		const ticketNumber = await getCurrentParticipations();
		// TODO
		const reward = "Cashi $30";
		return [ticketNumber, ""];
	};

	useEffect(() => {
		// TODO get the participation number and reward from the API
		setLoading(true);
		const mail: string = Mail;
		const phoneNumber = PhoneNumber;

		if (mail === "") {
			return;
		}

		makePostCall()
			.then((response: [number, string]) => {
				setParticipationNumber(response[0]);
				setReward(response[1]);
				setMail(mail);
				setLoading(false);
			})
			.catch((error) => {
				console.log("Failed to get participation number and reward");
				setLoading(false);
			});
	}, [participation, closeParticipation]);

	return (
		participation && (
			<div className='fixed inset-0 z-50 flex w-full items-center justify-center bg-black/80 '>
				{loading ? (
					<div>
						<BarLoader color='#FCE52C' width={500} />
					</div>
				) : (
					<div className='h-fit w-11/12 max-w-2xl whitespace-normal rounded-3xl border-2 border-white bg-primary text-center text-xs font-thin text-white md:w-fit md:text-base lg:text-lg'>
						<div className='p-3 md:p-8'>
							<div className='flex justify-end pb-3'>
								<Image
									src='/images/x.svg'
									width={20}
									height={20}
									alt='Cerrar'
									className='hover:cursor-pointer'
									onClick={() => {
										closeParticipation();
									}}
								/>
							</div>
							<p className='text-lg font-bold text-secondary md:text-3xl'>
								MUCHAS GRACIAS POR PARTICIPAR
							</p>
							<p className='py-4 '>
								Se ha registrado correctamente tu ticket, fuiste el <br />{" "}
								participante{" "}
								<span className='text-secondary'> #{participationNumber} </span>{" "}
								del dia {new Date().toLocaleDateString()}.{" "}
							</p>
							{/* TODO agregar el recetario si no ganan algun premio */}
							{reward != "" ? (
								<div className='flex flex-col items-center'>
									<Image
										className='w-44 py-4 md:w-80'
										src={testRewardImage}
										width={500}
										height={500}
										alt='Premio'
									/>
									<p>
										Eres el posible ganador de{" "}
										<span className='text-secondary'>{reward}</span>. Un mail
										con los detalles de tu premio será enviado a tu correo
										electrónico registrado:
										<br />
										<span className='text-secondary'>{mail}.</span>
										<br />{" "}
										<span className='text-xs'>
											Recuerda checar tu bandeja de spam.
										</span>
									</p>
								</div>
							) : (
								<p>
									Desafortunadamente no fuiste acreedor a un premio, pero no te
									desanimes, puedes seguir participando.
								</p>
							)}

							<div className=' flex flex-col gap-4 '></div>
						</div>
					</div>
				)}
			</div>
		)
	);
};

export default Participation;
