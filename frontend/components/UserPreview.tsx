import Link from "next/link";
import React from "react";

export default function UserPreview({ user }: { user: any }) {
	return (
		<Link href={`/profile/${user?._id}`} className="flex mx-2">
			<div className="flex m-2 items-center">
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
				<span className="ml-2 text-sm font-semibold font-sans">
					{user.name}
				</span>
			</div>
		</Link>
	);
}
