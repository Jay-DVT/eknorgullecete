"use client";
import Image from "next/image";
import useParticipationStore from "@/app/hooks/participationStore";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import axios from "axios";

const Participation = () => {
	// TODO: Remove this testReward and testRewardImage
	const [responseReward, setResponseReward] = useState<string>("");
	const [responsePosition, setResponsePosition] = useState<number>(0);

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
	const Reward = useParticipationStore((state) => state.reward);
	const setReward = useParticipationStore((state) => state.setReward);
	const setMailState = useParticipationStore((state) => state.setMail);
	const setPhoneNumber = useParticipationStore((state) => state.setPhoneNumber);
	const setParticipationNumber = useParticipationStore(
		(state) => state.setParticipationNumber
	);

	const makePostCall = async (): Promise<[number, string]> => {
		setLoading(true);
		if (!PhoneNumber) return [0, ""];
		await axios
			.post(
				"http://3.231.86.130:3000/api/post/tickets/ticket-upload",
				{
					user_number: PhoneNumber,
					//TODO link S3
					ticket_url: "placeholder",
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				const json = JSON.parse(response.data);
				setPhoneNumber("");
				setResponsePosition(json.ticket_position);
				setResponseReward(json.ticket_prize_description);
			})
			.catch((error) => {
				console.log("Failed to make post call");
				return [0, ""];
			});
		setLoading(false);
		return [0, ""];
	};

	useEffect(() => {
		makePostCall().catch((error) => {
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
								<span className='text-secondary'> #{responsePosition} </span>{" "}
								del dia {new Date().toLocaleDateString()}.{" "}
							</p>
							{/* TODO agregar el recetario si no ganan algun premio */}
							{Reward == "" ? (
								<div className='flex flex-col items-center'>
									<Image
										className='w-44 py-4 md:w-80'
										src={testRewardImage}
										width={500}
										height={500}
										alt='Premio'
									/>
									{responseReward.includes("pdf") ? (
										<p>
											Felicidades haz ganado un
											<span>recetario digital</span>. Un mail con tu premio ha
											sido enviado a tu correo electrónico registrado:
										</p>
									) : (
										<p>
											Eres el posible ganador de{" "}
											<span className='text-secondary'>{responseReward}</span>.
											Un mail con los detalles de tu premio será enviado a tu
											correo electrónico registrado:
										</p>
									)}
									<p>
										<span className='text-secondary'>{Mail}.</span>
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
