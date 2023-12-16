"use client";
import ProjectCard from "@/components/ProjectCard";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import React from "react";
import data from "@/public/dummyproducts.json";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function User({ params }: { params: { user: string } }) {
	const { data: session } = useSession();
	console.log(session);
	const user = session?.user as any;
	const profileBtns = () => {
		if (params.user === user?._id) {
			return (
				<Link href={'/profile/editProfile'}>
					<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4">
						Edit Profile
					</button>
				</Link>
			);
		} else {
			return (
				<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4">
					Follow
				</button>
			);
		}
	};
	return (
		<ComposedLayout>
			<div className="md:w-[50%] w-[90%] mx-auto my-4">
				<div className="w-full aspect-[3/1] relative" id="header">
					<img src="/assets/header.jpeg" className="w-full" alt="" />
					<img
						src={user?.image || "/assets/account.png"}
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
						<div className="pl-2">
							<p className="text-[1.5rem] font-sans font-bold">
								{user?.name}
							</p>
							<p className="text-[1rem] text-gray-500 font-sans font-thin">
								@{user?.username}
							</p>
						</div>
						{profileBtns()}
					</div>
					<div
						className="flex w-full px-4 my-4 flex-col justify-center"
						id="profile-bio"
					>
						<p className="text-[1rem] font-semibold font-sans">
							{user?.bio}
						</p>
					</div>
					<div className="flex items-center w-full py-4">
						<img
							src="/assets/github.png"
							alt=""
							width={25}
							className="mx-4"
						/>
						<img
							src="/assets/twitter.png"
							alt=""
							width={25}
							className="mx-4"
						/>
						<img
							src="/assets/instagram.png"
							width={25}
							className="mx-4"
							alt=""
						/>
					</div>
				</div>
				<Link href={'/projects/createproject'}>
					<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4">
						Edit Profile
					</button>
				</Link>
			</div>
			<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
			<div
				className="md:w-[70%] w-[90%] mx-auto flex flex-col"
				id="projects"
			>
				{data.slice(0, 1).map((item) => (
					<ProjectCard item={item} key={item.id} />
				))}
			</div>
		</ComposedLayout>
	);
}
