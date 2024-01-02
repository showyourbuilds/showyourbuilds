"use client";
import ProjectCard from "@/components/projectsRender/ProjectCard";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import LinksBar from "@/components/LinksBar";
export default function User({ params }: { params: { user: string } }) {
	const { data: session, update } = useSession() as any;
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [btnloading, setBtnLoading] = useState(false);
	const user = session?.user as any;
	const [userProfile, setUserProfile] = useState({} as any);
	const profileBtns = () => {
		if (params.user === user?.username) {
			return (
				<Link href={"/profile/editProfile"}>
					<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4 h-max">
						Edit Profile
					</button>
				</Link>
			);
		} else {
			return (
				<button
					className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] px-4 py-2 h-max"
					onClick={() => {
						handleFollow();
					}}
				>
					{btnloading ? (
						<>
							<div className="flex flex-row gap-2">
								<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
								<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
								<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
							</div>
						</>
					) : (
						<>
							{userProfile?.followers?.users?.includes(user?._id)
								? "Unfollow"
								: "Follow"}
						</>
					)}
				</button>
			);
		}
	};
	async function handleFollow() {
		setBtnLoading(true);
		let tempuser = { ...userProfile };
		if (user?.followers?.users?.includes(tempuser?.username)) {
			tempuser.followers.total--;
			tempuser.followers.users = tempuser.followers.users.filter(
				(item: any) => item !== user?._id
			);
		} else {
			tempuser.followers.total++;
			tempuser.followers.users.push(user?._id);
		}
		console.log(tempuser);

		try {
			const data = await fetch(`/api/user/followUnfollow`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tempuser,
				}),
			});
			const res = await data.json();
			if (res.status === 200) {
				setUserProfile(res.user);
				update();
				setBtnLoading(false);
			} else {
				console.log(res);
				setBtnLoading(false);
			}
		} catch (error) {
			console.log(error);
			setBtnLoading(false);
		}
	}
	function completionLevel() {
		if (userProfile?.socials?.length > 0) {
			if (userProfile?.bio?.length > 0) {
				if (userProfile?.image.length > 0) {
					return 100;
				}
				return 75;
			}
			return 50;
		}
		return 10;
	}

	useEffect(() => {
		setLoading(true);
		async function getData() {
			try {
				const data = await fetch(
					`/api/profile?username=${params.user}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const res = await data.json();
				if (res.status === 200) {
					setUserProfile(res.user);
					setLoading(false);
				} else {
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		if (session && session.user?.username !== params.user) {
			getData();
		} else if (session && session.user?.username === params.user) {
			setUserProfile(session.user);
			setLoading(false);
		}
	}, [session]);

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
					setProjects(res.projects);
					setLoading(false);
				} else {
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
			<div className="md:w-[50%] w-[90%] mx-auto">
				<div
					className={`w-[${completionLevel()}%] ${
						completionLevel() === 100
							? "bg-green-500"
							: completionLevel() === 75
							? "bg-yellow-500"
							: "bg-red-700"
					} h-[10px]`}
					aria-label="Profile Completion"
				></div>
			</div>
			<div className="md:w-[50%] w-[90%] mx-auto mb-4">
				<div className="w-full aspect-[3/1] relative" id="header">
					<img src="/assets/header.jpeg" className="w-full" alt="" />
					<img
						src={userProfile?.image || "/assets/account.png"}
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
								{userProfile?.name}
							</p>
							<p className="text-[1rem] text-gray-500 font-sans font-thin">
								@{userProfile?.username}
							</p>
						</div>
						{profileBtns()}
					</div>
					<div
						className="flex w-full px-4 my-4 flex-col justify-center"
						id="profile-bio"
					>
						<p className="text-[1rem] font-semibold font-sans">
							{userProfile?.bio}
						</p>
					</div>
					<div className="px-4 my-4 flex items-center">
						<p className="font-bold">
							{userProfile?.followers?.total}
							<span className="text-gray-500 font-sans font-semibold me-2">
								{" "}
								followers
							</span>
						</p>
					</div>
					{userProfile?.socials?.length > 0 ? (
						<div className="flex items-center w-full my-4">
							<LinksBar links={userProfile?.socials} />
						</div>
					) : (
						<></>
					)}
				</div>
				{user?._id === params.user && (
					<Link href={"/projects/createproject"}>
						<button className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black rounded-[20px] py-2 px-4">
							Create Project
						</button>
					</Link>
				)}
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
				<p className="text-gray-400 font-mono my-4 text-[13px] text-center hover:underline">
					No project(s) listed
				</p>
			)}
		</ComposedLayout>
	);
}
