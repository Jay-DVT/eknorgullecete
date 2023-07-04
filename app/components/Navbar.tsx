import Image from "next/image";
import Notifications from "./Notifications";

const Navbar = () => {
	return (
		<nav className='bg-primary'>
			<div className='relative mx-auto flex max-w-7xl justify-between p-2'>
				<div className='flex gap-5'>
					<Image
						src={"/images/BodegaAurrera.png"}
						alt='Bodega Aurrera'
						height={65}
						width={178}
					/>
					<Image src={"/images/Knorr.png"} alt='Knorr' width={80} height={65} />
				</div>
				<div className='flex items-center gap-10 text-lg font-bold text-secondary'>
					<a href='#hero'>Participa</a>
					<a href='#howto'>Cómo participar</a>
					<a href='#rewards'>Premios</a>
					<a href='#products'>Productos participantes</a>
				</div>
			</div>
			<Notifications />
		</nav>
	);
};

export default Navbar;
