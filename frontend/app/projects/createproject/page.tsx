"use client";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function CreateProject() {
	const { data: session, status } = useSession() as {
		status: string;
		data: any;
	};
	const [repos, setRepos] = useState([]);
	useEffect(() => {
		async function getRepositories() {
			if (session) {
				try {
					const repo = await fetch(
						`https://api.github.com/users/${session?.user?.username}/repos`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Accept: "application/vnd.github+json",
							},
						}
					);
					if (repo.status === 200) {
						const sortedData = await repo.json().then(
							(data) => {
								data.sort(({ a, b }: { a: any; b: any }) => {
									const dateA = new Date(
										a?.updated_at
									) as any;
									const dateB = new Date(
										b?.updated_at
									) as any;
									return dateB - dateA;
								});
								return data;
							},
							(err) => {
								console.log(err);
							}
						);
                        setRepos(sortedData);
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		getRepositories();
	}, [session]);
	return (
		<ComposedLayout>
			<div className="w-[50%] flex flex-col">
				<h1 className="text-3xl font-bold">Create Project</h1>
				<input
					type="text"
					className="text-2xl font-bold font-sans"
					placeholder="Enter Project title"
				/>
				<input
					type="text"
					className="text-xl font-sans"
					placeholder="Enter Project Description"
				/>
				<input
					type="text"
					className="text-xl font-sans"
					placeholder="When did your project end ?"
				/>
				<select name="repository" id="">
					<option value="">
						Choose a repository which has the above mentioned
						project{" "}
					</option>
					{repos.length >= 0 && repos.map((repo: any) => (
						<option key={repo?.id} value={repo?.id}>{repo?.name}</option>
					))}
				</select>
			</div>
		</ComposedLayout>
	);
}
