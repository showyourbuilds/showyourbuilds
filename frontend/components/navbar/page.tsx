"use client";
import { setMode } from "@/redux/features/authSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPreview from "../UserPreview";
import Notifications from "../Notifications";
import MobileMenu from "../MobileMenu";
export default function Navbar() {
	const { data: session, status: sessionStatus } = useSession();
	const isLoggedIn = sessionStatus === "authenticated" ? true : false;

	const mode = useSelector((state: any) => state.mode);
	const dispatch = useDispatch();
	const toggleMode = () => {
		dispatch(setMode());
	};
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => {
		if (!isOpen) {
			document
				.getElementById("toggle-ul")
				?.classList.replace("left-[-100vw]", "left-[0]");
			document
				.getElementById("toggle-ul")
				?.classList.replace("rounded-br-[50%]", "rounded-br-[0]");
			setIsOpen(!isOpen);
		} else {
			document
				.getElementById("toggle-ul")
				?.classList.replace("left-[0]", "left-[-100vw]");
			document
				.getElementById("toggle-ul")
				?.classList.replace("rounded-br-[0]", "rounded-br-[50%]");
			setIsOpen(!isOpen);
		}
	};
	const li = ["Home", "Explore"];
	return (
		<div className="flex w-[100%] max-w-[2000px] min-h-[70px] mx-auto md:h-[13vh] h-[10vh] justify-between dark:bg-white">
			<p className="md:w-[20%] w-[40%] md:m-auto m-4 flex md:justify-center justify-start items-center">
				<span className="py-2 font-serif">showmybuild</span>
				<span className="bg-black border border-transparent text-white py-2 font-serif">
					.cs
				</span>
			</p>
			<ul
				id="toggle-ul"
				className="md:w-[15%] h-[100%] bg-[#1f1c20] transition-all duration-300 rounded-br-[50%] md:rounded-none md:bg-transparent w-full z-10 absolute md:relative md:flex md:left-0 left-[-100vw] justify-around m-auto list-none pt-14 pl-8 md:p-0 items-center"
			>
				<li className="mx-4 flex items-center bg-transparent text-white md:text-gray-700 my-8 font-semibold md:my-0 hover:bg-gray-500 hover:p-4 md:hover:bg-transparent md:hover:p-0 transition-all">
					<Link href={"/"} className="bg-transparent">
						Home
					</Link>
				</li>
				<li className="mx-4 flex items-center bg-transparent text-white md:text-gray-700 my-8 font-semibold md:my-0 hover:bg-gray-500 hover:p-4 md:hover:bg-transparent md:hover:p-0 transition-all">
					<Link href={"/explore"} className="bg-transparent">
						Explore
					</Link>
				</li>
				<li className="mx-4 md:hidden flex text-white items-center bg-transparent my-8 hover:bg-gray-500 hover:p-4 transition-all">
					<UserPreview user={session?.user} />
				</li>
				<li className="mx-4 md:hidden flex items-center bg-transparent text-white md:text-black my-8 md:my-0">
					<Link
						href={"/auth"}
						className={`py-2 px-4 border text-center hover:bg-white hover:text-black border-gray-200 ${
							!isLoggedIn ? "text-white" : "text-red-600"
						}`}
					>
						{isLoggedIn ? "Logout" : "Login"}
					</Link>
				</li>
			</ul>
			<div className="w-[40%] lg:w-[60%] flex justify-between items-center">
				<input
					type="text"
					className="hidden lg:flex lg:w-[50%] h-[45%] px-8 outline-none rounded-[50px] bg-gray-200"
					placeholder="Search.."
				/>
				{isLoggedIn ? (
					<>
						<div className="w-full xl:w-[35%] lg:w-[45%] mx-auto flex items-center justify-around">
							<a className="flex items-center">
								<Notifications />
							</a>
							<div className="hidden md:block">
								<MobileMenu user={session?.user} />
							</div>
							<div
								id="menuIcon"
								className="cursor-pointer bg-white md:hidden flex flex-col justify-around items-center py-4 pl-3 pr-4 z-20"
								onClick={handleClick}
							>
								<div
									id="bar1"
									className={`w-5 h-1 bg-black mb-1 transition-transform duration-300 ${
										isOpen
											? "transform rotate-45 translate-x-1 translate-y-2"
											: ""
									}`}
								></div>
								<div
									id="bar2"
									className={`w-5 h-1 bg-black mb-1 transition-opacity duration-300 ${
										isOpen ? "opacity-0" : ""
									}`}
								></div>
								<div
									id="bar3"
									className={`w-5 h-1 bg-black transition-transform duration-300 ${
										isOpen
											? "transform -rotate-45 translate-x-1 -translate-y-2"
											: ""
									}`}
								></div>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="w-[80%] md:min-w-[140px] md:w-[20%] flex items-center">
							<Link
								href={"/auth"}
							>
								<button className='border border-gray-400 font-sans font-thin text-[#626262] hover:border-black hover:border-[2px] rounded-[20px] py-2 px-4'>Login</button>
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
