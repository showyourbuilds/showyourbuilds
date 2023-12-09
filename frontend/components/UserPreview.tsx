import Link from "next/link";
import React from "react";

export default function UserPreview({user}: {user: any}) {
	return (
        <Link href={`/profile/${user?.username}`} className="flex mx-auto">
            <div className="flex m-2 items-center">
                <img width={30} src={user.picture || "/assets/account.png"} alt="" />
                <span className="ml-2 text-sm font-semibold font-sans">
                    {user.name}
                </span>
            </div>
        </Link>
	);
}
