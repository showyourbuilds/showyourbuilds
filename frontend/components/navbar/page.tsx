"use client";
import { setMode } from "@/redux/features/authSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPreview from "../UserPreview";
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
			<p className="md:w-[20%] w-[40%] m-auto flex justify-center items-center">
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
				<li className="mx-4 md:hidden flex items-center bg-transparent my-8 hover:bg-gray-500 hover:p-4 transition-all">
					<i className="fa-solid fa-user-circle text-[2.5rem] bg-transparent text-white"></i>
					<p className="bg-transparent text-white mx-4">user</p>
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
			<div className="w-[40%] md:w-[60%] flex justify-between items-center">
				<input
					type="text"
					className="hidden md:flex md:w-[50%] h-[45%] px-8 outline-none rounded-[50px] bg-gray-200"
					placeholder="Search.."
				/>
				{isLoggedIn ? (
					<>
						<div className="w-[80%] md:min-w-[140px] md:w-[45%] flex items-center justify-around">
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
						<Link href={"/profile/dummyuser"}>
							<div className="md:flex items-center hidden cursor-pointer mx-4 hover:border hover:text-white transition px-2 py-4 rounded-md">
									{session?.user?.image ? (
										<img
											src={session?.user?.image}
											alt=""
											width={'34px'}
											className="rounded-full"
										/>
									) : (
										<i className="fa-solid fa-user-circle text-[1.5rem] md:text-[2rem]"></i>
									)}
								<p className="text-[13px] text-gray-400 mx-2">{session?.user?.name}</p>
								{/* <UserPreview user={} /> */}
							</div>
								</Link>
							<div className="md:block hidden cursor-pointer">
								<div className="md:min-w-[140px] flex items-center">
									<button
										onClick={() => signOut()}
										className="text-center bg-gray-200 text-[#495057] hover:border-black px-6 py-2 text-[15px] font-thin rounded-lg"
									>
										Logout
									</button>
								</div>
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
								className="text-center bg-gray-200 text-[#495057] hover:border-black px-6 py-2 text-[15px] font-thin rounded-lg"
							>
								Login
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
