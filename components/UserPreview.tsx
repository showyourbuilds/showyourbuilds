import Link from "next/link";
import React from "react";

export default function UserPreview({ user }: { user: any }) {
	return (
		<Link href={`/profile/${user?.username}`} className="flex mx-2">
			<div className="flex my-2 items-center">
				{user?.image ? (
					<img
						src={user?.image}
						alt=""
						width={"34px"}
						className="rounded-full"
					/>
				) : (
					<i className="fa-solid fa-user-circle text-[1.5rem] md:text-[2rem]"></i>
				)}
				<span className="ml-2 text-sm font-semibold font-sans min-w-[90px]">
					{user?.name}<br></br>
					<span className="text-gray-500 font-sans text-[0.6rem]">
						{user?.username}
					</span>
				</span>
			</div>
		</Link>
	);
}
