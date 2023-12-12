"use client";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function EditProfile() {
	const { data: session } = useSession();
	return (
		<ComposedLayout>
			<div className="md:w-[50%] w-[90%] mx-auto my-4">
				<div className="w-full aspect-[3/1] relative" id="header">
					<img src="/assets/header.jpeg" className="w-full" alt="" />
					<img
						src={session?.user?.image || "/assets/account.png"}
						className="absolute w-[10%] z-[10] rounded-[50%] border-white bg-white left-4 bottom-[15px]"
						alt=""
					/>
				</div>
				<div
					className="w-full h-max flex flex-col bg-white relative"
					id="profile"
				>
					<div
						className="flex w-full px-2 my-2 justify-between mx-auto"
						id="profile-user-info"
					>
						<div className="flex flex-col">
							<input
								type="text"
								placeholder={session?.user?.name || "name"}
								className="text-[1.5rem] font-sans font-bold outline-none border my-2 p-2"
							/>
							<input
								type="text"
								placeholder={"@" + "username"}
								className="text-[1rem] text-gray-500 font-sans font-thin outline-none border my-2 p-2"
							/>
						</div>
					</div>
					<div
						className="flex w-full px-2 my-4 flex-col justify-center"
						id="profile-bio"
					>
						<textarea
							name="bio"
							id="bio"
							cols={20}
							rows={5}
							className="text-[1rem] border p-2 font-semibold font-sans"
							placeholder={"Enter your Bio...."}
						></textarea>
					</div>
					<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black py-2 px-4 h-[80%] md:w-[20%] w-[50%] md:mt-4 md:mx-2 mx-auto rounded-[10px]">
						Save
					</button>
					{/* <div className="flex flex-col items-center w-full py-4">
						<input type="text" name="link" id="" />
					</div> */}
				</div>
			</div>
			<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
		</ComposedLayout>
	);
}
