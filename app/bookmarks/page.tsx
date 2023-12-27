"use client"
import ComposedLayout from "@/components/layouts/ComposedLayout";
import ProjectCard from "@/components/projectsRender/ProjectCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
	const bookmarks = useSelector(
		(state: any) => state.bookmarks
	) as any[];
	const [projects, setProjects] = useState([] as any[]);
	useEffect(() => {
		async function getBookmarks() {
			try {
				const data = await fetch(`/api/projects/getProjectsbyBookmarks`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ bookmarks }),
				});
				const res = await data.json();
				if (res.status === 200) {
					setProjects(res.projects);
				}
			} catch (error) {
				console.log(error);
			}
		}
		getBookmarks();
	})
	return (
		<ComposedLayout>
			{projects.length > 0 ? (
				<div
					className="lg:w-[60%] md:w-[70%] w-[90%] mx-auto flex flex-col"
					id="projects"
				>
					{projects.map((item: any) => (
						<ProjectCard item={item} key={item._id} />
					))}
				</div>
			) : (
				<p className="text-gray-400 font-mono my-4 text-[13px] text-center hover:underline">No project(s) Bookmarked</p>
			)}
		</ComposedLayout>
	);
}
