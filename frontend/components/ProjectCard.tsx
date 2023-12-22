"use client";
import React, { useState } from "react";
import UserPreview from "./UserPreview";
import TechStack from "./TechStack";
import { useRouter } from "next/navigation";
import LinksBar from "./LinksBar";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { handleBookmark } from "@/redux/features/authSlice";

export default function ProjectCard({ item, key }: { item: any; key: any }) {
	const [isLiked, setLiked] = useState(false);
	const [moreMenu, setMoreMenu] = useState(false);
	const isBookmarked = useSelector((state: any) => state.bookmarks.includes(item._id));
	const [bookmarked, setBookmarked] = useState(isBookmarked || false);
	const router = useRouter();
	const { data:session } = useSession() as any;
	const handleLike = () => {
		setLiked(!isLiked);
	};
	const dispatch = useDispatch();
	const handleDeleteProject = async () => {
		try {
			const data = await fetch(`/api/projects/deleteProject?id=${item._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			const res = await data.json();
			if (res.status === 200) {
				console.log(res);
				router.refresh();	
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditProject = async () => {
		router.push(`/projects/editproject/${item._id}`);
	}

	const handleBookmarkProject = async () => {
		try {
			dispatch(handleBookmark({bookmark: item._id}));
			setBookmarked((prev: boolean) => !prev);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div
			key={key}
			className="md:w-[70%] w-[90%] relative hover:scale-[1.01] transition mx-auto my-8 border rounded-lg"
		>
			{/* {isLiked ? (
				<div
					className="py-2 px-4 flex items-center absolute right-4 top-4 bg-white rounded-[30px] cursor-pointer"
					onClick={() => handleLike()}
				>
					<span className="mx-2 text-gray-600 font-semibold">20</span>
					<img src="/assets/heart.png" alt="" width={30} />
				</div>
			) : (
				<div
					className="py-2 px-4 flex items-center absolute right-4 top-4 bg-white rounded-[30px] cursor-pointer"
					onClick={() => handleLike()}
				>
					<span className="mx-2 text-gray-600 font-semibold">20</span>
					<img src="/assets/like.png" alt="" width={30} />
				</div>
			)} */}
			<div className={`p-2 ${session?.user?._id === item?.owner?._id} items-center absolute right-4 top-4 bg-white rounded-[30px] cursor-pointer`} onClick={() => {
				setMoreMenu(!moreMenu)
			}}>
				<img src="/assets/more.png" width={20} alt="" />
			</div>
			<div className={`p-2 ${moreMenu ? "flex" : "hidden"} absolute right-4 top-14 bg-white rounded-lg`}>
				<button className="p-2 mx-2" onClick={handleEditProject}><img src="/assets/edit-button.png" width={20} alt="" /></button>
				<button className="p-2 mx-2" onClick={handleDeleteProject}><img src="/assets/delete.png" width={20} alt="" /></button>
				<button className="p-2 mx-2" onClick={handleBookmarkProject}>
					{bookmarked 
					?
					<img src="/assets/bookmarked.png" width={20} alt="" />
					:
					<img src="/assets/bookmark.png" width={20} alt="" />
					}
				</button>
			</div>
			<div className="w-full h-fit rounded-t-lg">
				<img
					src={
						item?.snapshots?.length > 0
							? item.snapshots[0]
							: "/assets/1.png"
					}
					width={"100%"}
					alt=""
				/>
			</div>
			<div className="w-full rounded-b-lg border p-2">
				<div className="flex items-center py-2 px-4">
					<p className="text-2xl font-serif">{item.title}</p>
					{/* <p className="text-[13px] font-thin text-gray-500 ml-2 mt-1 font-sans">
						{(Date.parse(item.duration))}
					</p> */}
				</div>
				<div className="flex justify-between flex-col px-4 py-2">
					<p className="text-sm italic font-sans">{item.desc}</p>
					<p className="flex w-[50%] justify-start items-center mt-4 border border-transparent hover:border-gray-400 transition p-2">
						<div className="w-[60%]">
							<UserPreview user={{ name: "Anirudh Patel" }} />
						</div>
						<div className="flex w-[50%] mx-2 items-center">
							<img
								src="/assets/github.png"
								alt=""
								width={20}
								className="ml-3"
							/>
							<img
								src="/assets/twitter.png"
								alt=""
								width={20}
								className="ml-3"
							/>
							<img
								src="/assets/instagram.png"
								width={20}
								className="ml-3"
								alt=""
							/>
						</div>
					</p>
				</div>
				<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
				{item.techStack?.length > 0 ? (
					<TechStack stack={item?.techStack} />
				) : (
					<></>
				)}
				<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
				<div className="flex flex-col px-4 justify-between items-center">
					<p className="text-sm font-semibold text-gray-500 my-1 font-sans">
						Link(s)
					</p>
					<div className="flex flex-wrap my-2 w-full items-center justify-center">
						{item.links?.length > 0 ? (
							<LinksBar links={item.links} />
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
