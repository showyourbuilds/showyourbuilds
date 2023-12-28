"use client";
import React, { useState } from "react";
import UserPreview from "../UserPreview";
import TechStack from "../TechStack";
import { useRouter } from "next/navigation";
import LinksBar from "../LinksBar";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { handleBookmark } from "@/redux/features/authSlice";

export default function ProjectCard({ item, key }: { item: any; key: any }) {
	const [isLiked, setLiked] = useState(false);
	const [moreMenu, setMoreMenu] = useState(false);
	const isBookmarked = useSelector((state: any) =>
		state.bookmarks.includes(item._id)
	);
	const [bookmarked, setBookmarked] = useState(isBookmarked || false);
	const router = useRouter();
	const { data: session } = useSession() as any;
	const handleLike = () => {
		setLiked(!isLiked);
	};
	const dispatch = useDispatch();
	const handleDeleteProject = async () => {
		try {
			const data = await fetch(
				`/api/projects/deleteProject?id=${item._id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const res = await data.json();
			if (res.status === 200) {
				router.refresh();
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditProject = async () => {
		router.push(`/projects/editproject/${item._id}`);
	};

	const handleBookmarkProject = async () => {
		try {
			dispatch(handleBookmark({ bookmark: item._id }));
			setBookmarked((prev: boolean) => !prev);
		} catch (error) {
			console.log(error);
		}
	};
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
			<div
				className={`p-2 ${
					session?.user?._id === item?.owner?._id ? "flex" : "hidden"
				} items-center absolute right-4 top-4 bg-white rounded-[30px] cursor-pointer`}
				onClick={() => {
					setMoreMenu(!moreMenu);
				}}
			>
				<img src="/assets/more.png" width={20} alt="" />
			</div>
			<div
				className={`${
					session?.user?._id !== item?.owner?._id ? "flex" : "hidden"
				} items-center absolute right-4 top-4 bg-white rounded-[50%] cursor-pointer`}
			>
				<button className="p-2 m-2" onClick={handleBookmarkProject}>
					{bookmarked ? (
						<img src="/assets/bookmarked.png" width={20} alt="" />
					) : (
						<img src="/assets/bookmark.png" width={20} alt="" />
					)}
				</button>
			</div>
			<div
				className={`p-2 ${
					moreMenu ? "flex" : "hidden"
				} absolute right-4 top-14 bg-white rounded-lg`}
			>
				<button className="p-2 mx-2" onClick={handleEditProject}>
					<img src="/assets/edit-button.png" width={20} alt="" />
				</button>
				<button className="p-2 mx-2" onClick={handleDeleteProject}>
					<img src="/assets/delete.png" width={20} alt="" />
				</button>
			</div>
			<div className="w-full h-fit rounded-t-lg">
				<img
					src={item?.snapshots?.length > 0 ? item.snapshots[0] : ""}
					width={"100%"}
					alt=""
				/>
			</div>
			<div className="w-full rounded-b-lg border p-2">
				<div className="flex items-center py-2 px-4">
					<p className="text-[1.5rem] font-bold font-serif">
						{item.title}
					</p>
				</div>
				{item.techStack?.length > 0 && (
					<TechStack stack={item?.techStack} />
				)}
				<div className="flex w-full justify-between flex-col px-4 py-2 mt-4">
					<p className="text-[0.8rem] text-gray-500 font-sans">{item.desc}</p>
					<div className="flex w-full justify-start items-center mt-4 border border-transparent hover:border-gray-400 transition py-2">
						<div className="w-max">
							<UserPreview user={item.owner} />
						</div>
						{item.owner?.socials?.length > 0 && (
							<div className="flex w-max mx-2 items-center">
								<LinksBar links={item.owner.socials} />
							</div>
						)}
					</div>
				</div>

				{item.links?.length > 0 ? (
					<div className="flex flex-col px-4 justify-between my-4">
						<p className="text-[1rem] font-bold my-1 font-sans">
							Link(s):
						</p>
						<div className="flex flex-wrap my-2 w-full items-center">
							<LinksBar links={item.links} />
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
