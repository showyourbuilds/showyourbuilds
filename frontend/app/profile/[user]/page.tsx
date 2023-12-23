"use client";
import ProjectCard from "@/components/ProjectCard";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import LinksBar from "@/components/LinksBar";
export default function User({ params }: { params: { user: string } }) {
	const { data: session } = useSession() as any;
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = session?.user as any;
	const profileBtns = () => {
		if (params.user === user?._id) {
			return (
				<Link href={"/profile/editProfile"}>
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
	useEffect(() => {
		setLoading(true);
		async function getData() {
			try {
				const data = await fetch(
					`/api/projects/getuserProjects?id=${params.user}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const res = await data.json();
				if (res.status === 200) {
					console.log(res.projects);
					setProjects(res.projects);
					setLoading(false);
				} else {
					console.log(res);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getData();
	}, [params]);

	return (
		<ComposedLayout>
			<div className={`${loading ? "block" : "hidden"}`}>
				<LoadingPage />
			</div>
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
						className="flex w-full px-2 my-4 justify-between mx-auto"
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
					{user?.socials?.length > 0 ? (
						<div className="flex items-center w-full my-4">
							<LinksBar links={user?.socials} />
						</div>
					) : (
						<p className="text-gray-400 font-mono text-[10px] hover:underline">Add your socials to get them displayed here</p>
					)}
				</div>
				<Link href={"/projects/createproject"}>
					<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4">
						Create Project
					</button>
				</Link>
			</div>
			<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
			{projects.length > 0 ? (
				<div
					className="md:w-[70%] w-[90%] mx-auto flex flex-col"
					id="projects"
				>
					{projects.map((item: any) => (
						<ProjectCard item={item} key={item._id} />
					))}
				</div>
			) : (
				<p>
					No projects to display here, add some project's for people
					to see them
				</p>
			)}
		</ComposedLayout>
	);
}
