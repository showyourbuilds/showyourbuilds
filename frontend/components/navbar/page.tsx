"use client";
import { setMode } from "@/redux/features/authSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Navbar() {
	const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
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
		<div className="flex w-[100%] max-w-[1700px] min-h-[70px] mx-auto md:h-[13vh] h-[10vh] justify-between dark:bg-white">
			<p className="logo md:w-[20%] w-[40%] m-auto flex justify-center items-center">
				palettle&nbsp;
				<span className="bg-black text-white p-2 logo">pulse</span>
			</p>
			<ul
				id="toggle-ul"
				className="md:w-[15%] h-[100%] bg-[#1f1c20] transition-all duration-300 rounded-br-[50%] md:rounded-none md:bg-transparent w-full z-10 absolute md:relative md:flex md:left-0 left-[-100vw] justify-around m-auto list-none pt-14 pl-8 md:p-0 items-center"
			>
				<li
					className="mx-4 flex items-center bg-transparent text-white md:text-gray-700 my-8 font-semibold md:my-0 hover:bg-gray-500 hover:p-4 md:hover:bg-transparent md:hover:p-0 transition-all"
				>
					<Link href={'/'} className="bg-transparent">
						Home
					</Link>
				</li>
				<li
					className="mx-4 flex items-center bg-transparent text-white md:text-gray-700 my-8 font-semibold md:my-0 hover:bg-gray-500 hover:p-4 md:hover:bg-transparent md:hover:p-0 transition-all"
				>
					<Link href={'/explore'} className="bg-transparent">
						Explore
					</Link>
				</li>
				<li className="mx-4 md:hidden flex items-center bg-transparent my-8 hover:bg-gray-500 hover:p-4 transition-all">
					<i className="fa-solid fa-user-circle text-[2.5rem] bg-transparent text-white"></i>
					<p className="bg-transparent text-white mx-4">user</p>
				</li>
				<li className="mx-4 md:hidden flex items-center bg-transparent text-white md:text-black my-8 md:my-0">
					<Link href={'/auth'} className={`py-2 px-4 border text-center hover:bg-white hover:text-black border-gray-200 ${!isLoggedIn ? 'text-white' : 'text-red-600'}`}>{isLoggedIn ? "Logout" : "Login"}</Link>
				</li>
			</ul>
			<div className="w-[40%] md:w-[60%] flex justify-around items-center">
				<input
					type="text"
					className="hidden md:flex md:w-[50%] h-[45%] px-8 outline-none rounded-[50px] bg-gray-200"
					placeholder="Search.."
				/>
				{isLoggedIn 
				?
				<>
					<div className="w-[80%] md:min-w-[140px] md:w-[20%] flex items-center justify-around">
						<a>
							<i className="fa-solid fa-cart-shopping text-[1rem] md:text-[1.5rem] cursor-pointer"></i>
						</a>
						<a className="flex items-center">
							<i className="fa-solid fa-bell text-[1rem] md:text-[1.5rem] cursor-pointer"></i>
							<div className="w-[10%] h-[10%] bg-red-500 rounded-full flex justify-center items-cblack font-bold"></div>
						</a>
						{/* {mode === "light" ? (
							<i
								className="fa-regular fa-moon text-[1rem]"
								onClick={() => {
									toggleMode();
								}}
							></i>
						) : (
							<i
								className="fa-regular fa-sun text-[1rem]"
								onClick={() => {
									toggleMode();
								}}
							></i>
						)} */}
						<div className="md:block hidden cursor-pointer">
							<Link href={'/profile/dummyuser'}>
								<i className="fa-solid fa-user-circle text-[1.5rem] md:text-[2rem]"></i>
							</Link>
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
				:
				<>
					<div className="w-[80%] md:min-w-[140px] md:w-[20%] flex items-center justify-around">
						<Link href={'/auth'} className="w-[80%] bg-gray-200 text-center border border-transparent hover:border hover:border-black py-[5px] text-[15px] font-serif">Login &nbsp;||&nbsp; SignUp</Link>
					</div>
				</>
				}
			</div>
		</div>
	);
}
