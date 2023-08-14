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
	const FullName = useParticipationStore((state) => state.fullName);
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

	function mapImage(input: string): string {
		const mapping: { [key: string]: string } = {
			Cashi: "cuponcashi",
			recetario: "recetario",
			Pantalla: "TVHISENSE40",
			Tarjeta: "Tarjeta65",
		};

		for (const key in mapping) {
			if (input.includes(key)) {
				return mapping[key];
			}
		}

		return input;
	}

	const makePostCall = async (): Promise<[number, string]> => {
		setResponseReward("error");
		if (!PhoneNumber) return [0, ""];
		setLoading(true);
		// TODO Check if user already exists, wait for single api call
		const httpUser =
			"http://3.231.86.130:3000/api/get/users/byNumber/" + PhoneNumber;
		await axios.get(httpUser).catch((response) => {
			console.log(response);
		});

		// check if 5 tickets have been used
		const http =
			"http://3.231.86.130:3000/api/get/users/check-if-user-max-five-today-byUserNumber/" +
			PhoneNumber;
		await axios
			.get(http)
			.then((response) => {
				const json = JSON.parse(response.data);
				console.log(json);
				if (json.max_five === "true") {
					setLoading(false);
					// Show correct description
					setResponseReward("max_participations");
					console.log("Max participations");
					return [0, ""];
				}
			})
			.catch((error) => {
				if (error != 404) {
					return [0, ""];
				}
			});

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
				setResponseReward("error");
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

							{responseReward == "error" ? (
								<div>
									Encontramos un error con tu respuesta, vuelve a intentar en
									unos minutos
								</div>
							) : responseReward == "max_participations" ? (
								<div>
									Una disculpa, solo se aceptan 5 tickets por persona al dia.
								</div>
							) : (
								<div>
									<p className='text-lg font-bold text-secondary md:text-3xl'>
										MUCHAS GRACIAS POR PARTICIPAR
									</p>
									<p className='py-4'>
										Se ha registrado correctamente tu ticket, fuiste el <br />
										participante{" "}
										<span className='text-secondary'>
											#{responsePosition}
										</span>{" "}
										del dia {new Date().toLocaleDateString()}.
									</p>
									<div className='flex flex-col items-center'>
										<Image
											className='w-44 py-4 md:w-80'
											src={"/images/" + mapImage(responseReward) + ".png"}
											width={500}
											height={500}
											alt={responseReward}
										/>
										{responseReward.includes("pdf") ? (
											<p>
												Felicidades haz ganado un
												<span>recetario digital</span>. Un mail con tu premio ha
												sido enviado a tu correo electrónico registrado:
											</p>
										) : (
											<p>
												Eres el posible ganador de
												<span className='text-secondary'>{responseReward}</span>
												. Un mail con los detalles de tu premio será enviado a
												tu correo electrónico registrado:
											</p>
										)}
										<p>
											<span className='text-secondary'>{Mail}</span>
											<br />
											<span className='text-xs'>
												Recuerda checar tu bandeja de spam.
											</span>
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		)
	);
};
export default Participation;
