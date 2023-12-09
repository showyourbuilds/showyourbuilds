"use client";
import BlankLayout from "@/components/layouts/BlankLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Alert from "@/components/Alert";

export default function auth() {
	const router = useRouter();
	const [loginPage, setLoginPage] = useState(true);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const session  = useSession();
	const openAlert = () => {
		setIsAlertOpen(true);
	};

	const closeAlert = () => {
		setIsAlertOpen(false);
	};

	useEffect(() => {
		if (session?.status === "authenticated") {
			router.replace("/");
		}
	}, [session, router]);
	const checkEmail = (email: string) => {
		const emailRegex = new RegExp(
			"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
		);
		return emailRegex.test(email);
	};
	const handleGithubLogin = async () => {
		signIn("github");
	}
	const handleLogin = async (e: any) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		if (!email || !password || password.length < 8) return;
		if (!checkEmail(email)) return;
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (res?.error) {
			setAlertMessage("Invalid Credentials");
			openAlert();
		} else {
			router.push("/");
		}
	}
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const name = e.target[0].value;
		const email = e.target[1].value;
		if (!checkEmail(email)) {
			console.log("enter proper email");
			return;
		}
		const password = e.target[2].value;
		if (!password || password.length < 8) {
			console.log("password must be atleast 8 characters long");
			return;
		}
		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});
			if (res.status === 400) {
				console.log("Email already Registered");
				setAlertMessage("This email is already registered");
				openAlert();
			}
			if (res.status === 500) {
				console.log("Server Error");
				setAlertMessage("Server Error");
				openAlert();
			}
			if (res.status === 201) {
				console.log(res);
				router.push("/");
			}
		} catch (error) {
			setAlertMessage(`${error}`);
			openAlert();
			console.log(error);
		}
	};
	return (
		<BlankLayout>
			<Alert
				isOpen={isAlertOpen}
				onClose={closeAlert}
				message={alertMessage}
			/>
			{loginPage ? (
				<div className="w-[40%] absolute top-[15vh] left-[30%] flex flex-col items-center">
					<form
						className="flex w-[50%] flex-col mx-auto my-4"
						onSubmit={handleLogin}
					>
						<p className="text-black font-serif text-3xl font-bold my-4">
							Login
						</p>
						<input
							type="text"
							placeholder="email"
							className="my-2 p-2 border"
						/>
						<input
							type="password"
							placeholder="password"
							className="my-2 p-2 border"
						/>
						<button
							type="submit"
							className="w-[20%] mt-2 mx-auto border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem] transition"
						>
							Login
						</button>
					</form>
					<div className="w-[50%] my-2 h-[0.5px] bg-gray-300"></div>
					<div className="w-[20%] my-2 flex justify-around flex-wrap">
						<button
							type="button"
							className="bg-[#24292F] text-white hover:bg-[#24283F]/90 focus:ring-4 focus:outline-black focus:ring-[#24292F]/50 rounded-[50%] p-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
							onClick={() => handleGithubLogin()}
						>
							<svg
								className="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<button
							type="button"
							className="bg-[#2363c9] text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-black focus:ring-[#4285F4]/50 rounded-[50%] p-2 inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
						>
							<svg
								className="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 19"
							>
								<path
									fillRule="evenodd"
									d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div className="w-[50%] my-2 h-[0.5px] bg-gray-300"></div>
					<button
						className="w-[40%] border border-transparent bg-white text-black hover:bg-black hover:text-white hover:border hover:border-black py-[5px] my-4 text-[12px] transition"
						onClick={() => setLoginPage(false)}
					>
						Don't have an account? Signup
					</button>
				</div>
			) : (
				<div className="w-[40%] absolute top-[15vh] left-[30%] flex flex-col items-center">
					<form
						className="flex w-[50%] flex-col mx-auto my-4"
						onSubmit={handleSubmit}
					>
						<p className="text-black font-serif text-3xl font-bold my-4">
							SignUp
						</p>
						<input
							type="text"
							placeholder="name"
							className="my-2 p-2 border"
						/>
						<input
							type="text"
							placeholder="email"
							className="my-2 p-2 border"
						/>
						<input
							type="password"
							placeholder="password"
							className="my-2 p-2 border"
						/>
						<input
							type="password"
							placeholder="confirm password"
							className="my-2 p-2 border"
						/>
						<button
							type="submit"
							className="w-[20%] mt-2 mx-auto border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem] transition"
						>
							Sign-up
						</button>
					</form>
					<div className="w-[50%] my-2 h-[0.5px] bg-gray-300"></div>
					<button
						className="w-[40%] border border-transparent bg-white text-black hover:bg-black hover:text-white hover:border hover:border-black py-[5px] my-4 text-[12px] transition"
						onClick={() => setLoginPage(true)}
					>
						Already have an account? Login
					</button>
				</div>
			)}
		</BlankLayout>
	);
}
