"use client";
import Alert from "@/components/Alert";
import ComposedLayout from "@/components/layouts/ComposedLayout";
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
			const response = await fetch(`/api/search?query=${searchQuery}`);
			const data = await response.json();
			setResults(data);
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
			{results.length > 0 && (
				<div className="w-[90%] mx-auto">
					<p className="text-2xl font-semibold my-4">
						Search Results
					</p>
					<div className="flex flex-col">
						{results.map((result) => (
							<div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 py-4">
								<div className="flex items-center">
									<img
										src={result.image}
										alt=""
										className="w-16 h-16 rounded-[50%]"
									/>
									<div className="flex flex-col ml-4">
										<p className="text-xl font-semibold">
											{result.title}
										</p>
										<p className="text-sm font-semibold">
											{result.description}
										</p>
									</div>
								</div>
								<a
									href={result.link}
									target="_blank"
									rel="noreferrer"
									className="bg-[#1f1c20] text-white px-4 py-2 rounded-md"
								>
									View
								</a>
							</div>
						))}
					</div>
				</div>
			)}
		</ComposedLayout>
	);
}
