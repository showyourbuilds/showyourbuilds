"use client";
import React, { useState } from "react";
import UserPreview from "./UserPreview";
import TechStack from "./TechStack";
import Link from "next/link";

export default function ProjectCard({ item, key }: { item: any, key : any }) {
	const [isLiked, setLiked] = useState(false);
	const handleLike = () => {
		setLiked(!isLiked);
	};
	return (
		<Link href={'/projects/1321'}>
			<div
				key={key}
				className="md:w-[70%] w-[90%] relative hover:scale-[1.02] transition mx-auto my-8 border rounded-lg"
			>
				{isLiked ? (
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
				)}
				<div className="w-full h-fit rounded-t-lg">
					<img src="/assets/1.jpg" width={'100%'} alt="" />
				</div>
				<div className="w-full rounded-b-lg border p-2">
					<div className="flex items-center py-2 px-4">
						<p className="text-2xl font-serif">Learnwithme</p>
						<p className="text-[13px] font-thin text-gray-500 ml-2 mt-1 font-sans">
							9/22 - 3/23
						</p>
					</div>
					<div className="flex justify-between flex-col px-4 py-2">
						<p className="text-sm italic font-sans">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Illum amet, dignissimos est voluptate incidunt
							necessitatibus ratione, debitis nulla quia itaque natus
							tenetur consequuntur!
						</p>
						<p className="flex w-[40%] justify-start items-center mt-4 border border-transparent hover:border-gray-400 transition p-2">
							<div className="w-[60%]">
							<UserPreview user={{name: "Anirudh Patel"}} />
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
					<TechStack stack={["React", "Next.js", "Redux", "Node.js", "MongoDB", "Redux", "Node.js", "MongoDB", "Redux", "Node.js", "MongoDB"]} />
					<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
					<div className="flex flex-col px-4 justify-between items-center">
						<p className="text-sm font-semibold text-gray-500 my-1 font-sans">
							Link(s)
						</p>
						<div className="flex flex-wrap my-2 w-full items-center justify-center">
							<button className="me-2">
								<img src="/assets/link.png" width={30} alt="" />
							</button>
							<button
								type="button"
								className="bg-[#24292F] text-white hover:bg-[#24283F]/90 focus:ring-4 focus:outline-black focus:ring-[#24292F]/50 rounded-[50%] p-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2"
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
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
