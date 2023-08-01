import Image from "next/image";
import Notifications from "./Notifications";

const Navbar = () => {
	return (
		<nav className='bg-primary'>
			<div className='relative mx-auto flex max-w-7xl justify-center p-2 md:justify-between'>
				<div className='flex gap-5'>
					<Image
						className='hidden md:block'
						src={"/images/BodegaAurrera.png"}
						alt='Bodega Aurrera'
						height={65}
						width={178}
					/>
					<Image src={"/images/Knorr.png"} alt='Knorr' width={80} height={65} />
				</div>
				<div
					className='right-10 hover:cursor-pointer md:hidden'
					style={{
						position: "absolute",
						top: "50%",
						transform: "translateY(-50%)",
					}}
				>
					<Image
						src={"/images/burger2.png"}
						alt='Burger'
						width={50}
						height={50}
					/>
				</div>
				<div className='hidden items-center gap-10 text-lg font-bold text-secondary md:flex'>
					<a href='#hero' className='hover-underline-animation'>
						Participa
					</a>
					<a href='#howto' className='hover-underline-animation'>
						Cómo participar
					</a>
					<a href='#rewards' className='hover-underline-animation'>
						Premios
					</a>
					<a href='#products' className='hover-underline-animation'>
						Productos participantes
					</a>
				</div>
			</div>
			<Notifications />
		</nav>
	);
};

export default Navbar;
