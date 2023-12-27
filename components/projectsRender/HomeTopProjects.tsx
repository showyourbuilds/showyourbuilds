"use client"
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import LoadingPage from "../LoadingPage";

export default function HomeTopProjects() {
	const [projects, setProjects] = React.useState([] as any[]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function getProjects() {
			const res = await fetch("/api/projects", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.status === 200) {
				setProjects(data.projects);
			} else {
				console.log(data);
			}
			setLoading(false);
		}
		getProjects();
	} ,[]);
	return (
		<div className="flex flex-col h-max w-full items-center justify-center">
			<div className={`${loading ? "block" : "hidden"}`}>
				<LoadingPage />
			</div>
			{projects.length > 0 &&
				projects.map((item) => (
					<ProjectCard item={item} key={item.id} />
				))}
		</div>
	);
}
