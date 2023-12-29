"use client"
import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview";
import { useSession } from "next-auth/react";

export default function TopDevelopers() {
    const { data: session } = useSession() as any;
	const [users, setUsers] = useState([] as any[]);
    useEffect(() => {
        async function getUsers() {
            const res = await fetch(`/api/user/getTopDevelopersbyWeek?timestamp=${new Date().getTime()}`, {
                method: "GET",
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
					"Cache-Control": "no-store"
                },
            });
            const data = await res.json();
            if (data.status === 200) {
                setUsers(data.users);
            } else {
                console.log(data);
            }
        }
        getUsers();
    }, [session]);
    return (
		<div className="flex flex-col w-[70%] mx-auto">
			{users.map((item: any, index: number) => {
				return (
					<UserPreview
						key={index}
						user={item}
					/>
				);
			})}
		</div>
	);
}
