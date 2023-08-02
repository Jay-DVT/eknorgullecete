"use client";
import Image from "next/image";
import useStore from "../hooks/sideNavStore";

const DisplayNav = () => {
	const toggleSideNav = useStore((state) => state.toggleSideNav);

	function scrollIntoView(e: any, id: string) {
		let element = document.getElementById(id);
		e.preventDefault();
		toggleSideNav();
		element?.scrollIntoView({ behavior: "smooth" });
	}

	const displayNav = useStore((state) => state.isSideNavOpen);

	return displayNav ? (
		<div className=' fixed top-0 z-50 h-auto w-screen bg-primary '>
			<div className='flex flex-col'>
				<div className=' flex flex-col items-end text-lg font-bold text-secondary [&>*]:border-secondary [&>a]:w-full [&>a]:border-b-2 [&>a]:px-3 [&>a]:py-3'>
					<div className='mx-3 mt-3'>
						<Image
							src={"/images/x.svg"}
							alt='X'
							width={70}
							height={70}
							onClick={() => {
								toggleSideNav();
							}}
							className=''
						/>
					</div>
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
		</div>
	) : null;
};

export default DisplayNav;
