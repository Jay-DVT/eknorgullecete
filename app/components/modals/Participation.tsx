"use client";
import Image from "next/image";
import useParticipationStore from "@/app/hooks/participationStore";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import axios from "axios";

const Participation = () => {
	const [loading, setLoading] = useState<boolean>(true);

	const [responseReward, setResponseReward] = useState<string>("");
	const [responsePosition, setResponsePosition] = useState<number>(0);

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
	const ImageFile = useParticipationStore((state) => state.imageFile);

	// Setters
	const setMailState = useParticipationStore((state) => state.setMail);
	const setPhoneNumber = useParticipationStore((state) => state.setPhoneNumber);

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

	function handleClose() {
		// Reload page to reset state
		// window.location.reload();
		closeParticipation();
	}

	const makePostCall = async () => {
		if (!PhoneNumber) return;
		setLoading(true);

		try {
			const httpUser =
				"http://3.231.86.130:3000/api/get/users/byNumber/" + PhoneNumber;
			const httpUserResponse = await axios.get(httpUser);
			if (httpUserResponse.status == 404) {
				throw new Error("No user found");
			}
			const httpMaxParticipation =
				"http://3.231.86.130:3000/api/get/users/check-if-user-max-five-today-byUserNumber/" +
				PhoneNumber;
			const httpMaxParticipationResponse = await axios.get(
				httpMaxParticipation
			);
			const data = httpMaxParticipationResponse.data;
			if (data.max_five == true) {
				setResponseReward("max_participations");
				setLoading(false);
				// Show correct description
				return;
			}
		} catch (error) {
			const httpNewUser = "http://3.231.86.130:3000/api/post/users/user-upload";
			await axios.post(httpNewUser, {
				user_number: PhoneNumber,
				user_fullname: FullName,
				user_email: Mail,
				channel: "web",
			});
		}
		// S3 api call
		if (ImageFile == null) {
			setResponseReward("error");
			throw new Error("No image found");
		}

		// Post call
		const formData = new FormData();
		formData.append("file", ImageFile);

		const response = await fetch("/api/uploadToS3", {
			method: "POST",
			body: formData,
		});

		if (response.status != 200) {
			console.log("Upload Error");
			setResponseReward("error");
			return;
		}

		const data = await response.json();
		const url = data.Url;
		await axios
			.post(
				"http://3.231.86.130:3000/api/post/tickets/ticket-upload",
				{
					user_number: PhoneNumber,
					ticket_url: url,
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
			});
		setPhoneNumber("");
		setLoading(false);
	};

	useEffect(() => {
		makePostCall().catch((error) => {
			setLoading(false);
		});
	}, [participation, closeParticipation, PhoneNumber, Mail, FullName]);

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
									alt='X'
									className='hover:cursor-pointer'
									onClick={() => {
										handleClose();
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
									Una disculpa, solo se aceptan 5 tickets por persona al día.
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
												Eres el posible ganador de{" "}
												{responseReward == "Cupón Cashi de $30.00"
													? "un"
													: "una"}{" "}
												<span className='text-secondary'>{responseReward}</span>
												. Vamos a validar tu ticket y te enviaremos un mail con
												los detalles de tu premio en un máximo de 72hrs hábiles
												al correo registrado:
											</p>
										)}
										<p>
											<span className='text-secondary'>{Mail}</span>
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
