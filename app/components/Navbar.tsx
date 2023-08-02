"use client";
import Image from "next/image";
import Notifications from "./Notifications";
import useStore from "../hooks/sideNavStore";

function Navbar() {
	function scrollIntoView(e: any, id: string) {
		let element = document.getElementById(id);
		e.preventDefault();
		element?.scrollIntoView({ behavior: "smooth" });
	}

	const openSideNav = useStore((state) => state.toggleSideNav);

	function handleShowMenu() {
		openSideNav();
	}

	return (
		<nav className='fixed top-0 w-screen bg-primary md:static md:w-auto'>
			<div className='relative mx-auto flex max-w-7xl justify-center p-2 md:justify-between'>
				<div className='flex gap-5'>
					<Image
						className='hidden h-[65px] w-[178px] md:block'
						src={"/images/BodegaAurrera.png"}
						alt='Bodega Aurrera'
						height={300}
						width={300}
					/>
					<Image
						src={"/images/Knorr.png"}
						alt='Knorr'
						width={300}
						height={300}
						quality={100}
						className='h-[65px] w-[80px]'
					/>
				</div>
				<div
					className='right-10 hover:cursor-pointer md:hidden'
					style={{
						position: "absolute",
						top: "50%",
						transform: "translateY(-50%)",
					}}
					onClick={() => {
						handleShowMenu();
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
					<a
						href='/'
						className='hover-underline-animation'
						onClick={(e) => {
							scrollIntoView(e, "hero");
						}}
					>
						Participa
					</a>
					<a
						href='/'
						className='hover-underline-animation'
						onClick={(e) => scrollIntoView(e, "howto")}
					>
						Cómo participar
					</a>
					<a
						href='/'
						className='hover-underline-animation'
						onClick={(e) => scrollIntoView(e, "rewards")}
					>
						Premios
					</a>
					<a
						href='/'
						className='hover-underline-animation'
						onClick={(e) => scrollIntoView(e, "products")}
					>
						Productos participantes
					</a>
				</div>
			</div>
			<Notifications />
		</nav>
	);
}

export default Navbar;
