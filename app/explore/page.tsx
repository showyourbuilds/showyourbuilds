"use client";
import Alert from "@/components/Alert";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import ProjectCard from "@/components/projectsRender/ProjectCard";
import React, { useState } from "react";

export default function page() {
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([] as any[]);
	let searchTimeout: NodeJS.Timeout;
	const openAlert = () => {
		setIsAlertOpen(true);
	};

	const closeAlert = () => {
		setIsAlertOpen(false);
	};

	const handleSearch = async (searchQuery: string) => {
		try {
			const response = await fetch(`/api/searchprojects?query=${searchQuery}`);
			const data = await response.json();
			setResults(data.projects);
		} catch (error) {
            setAlertMessage("Something went wrong");
            openAlert();
			console.error(error);
		}
	};
	const onInputChange = (e: any) => {
		const value = e.target.value;
		setSearch(value);

		clearTimeout(searchTimeout as any);

		searchTimeout = setTimeout(() => {
			handleSearch(value);
		}, 300);
	};
	return (
		<ComposedLayout>
			<Alert
				isOpen={isAlertOpen}
				onClose={closeAlert}
				message={alertMessage}
			/>
			<input
				type="text"
				value={search}
				className="flex my-4 w-[80%] mx-auto py-2 px-8 outline-none rounded-[50px]"
				placeholder="Search for Projects by their titles.."
				onChange={onInputChange}
			/>
			{results.length > 0 && search.length > 0 && (
				<div className="lg:w-[50%] md:w-[70%] w-[90%] mx-auto">
					<p className="text-2xl font-semibold my-4">
						Search Results
					</p>
					<div className="flex flex-col w-full mx-auto">
						{results.map((result, index) => (
							<ProjectCard key={index} item={result} />
						))}
					</div>
				</div>
			)}
		</ComposedLayout>
	);
}
