"use client"
import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview";

export default function TopDevelopers() {
	const [users, setUsers] = useState([] as any[]);
    useEffect(() => {
        async function getUsers() {
            const res = await fetch("/api/user/getTopDevelopersbyWeek", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
    }, []);
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
