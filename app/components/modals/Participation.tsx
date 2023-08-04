"use client";
import Image from "next/image";
import useParticipationStore from "@/app/hooks/participationStore";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Participation = () => {
	// TODO: Remove this testReward and testRewardImage
	const testReward = [24, "Cashi $30", "participante@gmail.com"];
	const testRewardImage = "/images/premios_1.png";

	const [loading, setLoading] = useState<boolean>(true);

	const participation = useParticipationStore(
		(state) => state.isParticipationOpen
	);
	const toggleParticipation = useParticipationStore(
		(state) => state.toggleParticipation
	);

	function closeParticipation() {
		toggleParticipation();
	}

	const mail = useParticipationStore((state) => state.mail);
	const phoneNumber = useParticipationStore((state) => state.phoneNumber);
	const particpationNumber = useParticipationStore(
		(state) => state.participationNumber
	);

	useEffect(() => {
		// TODO get the participation number and reward from the API

		// dummy wait time
		setTimeout(() => {
			setLoading(false);
		}, 10000);
	}, []);

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
								Se ha registrado correctamente tu ticket, fusite el <br />{" "}
								participante{" "}
								<span className='text-secondary'> #{testReward[0]} </span> del
								dia {new Date().toLocaleDateString()}.{" "}
							</p>
							{testReward[1] ? (
								<div className='flex flex-col items-center'>
									<Image
										className='w-44 py-4 md:w-80'
										src={testRewardImage}
										width={500}
										height={500}
										alt='Premio'
									/>
									<p>
										Eres acreedor a{" "}
										<span className='text-secondary'>{testReward[1]}</span>. Un
										mail con los detalles de tu premio será enviado a tu correo
										electrónico registrado: {testReward[2]}.
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
