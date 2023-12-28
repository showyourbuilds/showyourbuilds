"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SearchProject() {
	let searchTimeout: NodeJS.Timeout;
	const [search, setSearch] = useState("" as string);
	const [results, setResults] = useState([] as any[]);

	const handleSearch = async (searchQuery: string) => {
		try {
			const response = await fetch(
				`/api/searchusers?query=${searchQuery}`
			);
			const data = await response.json();
			setResults(data.users);
		} catch (error) {
			console.error(error);
		}
	};
	const onInputChange = (e: any) => {
		const value = e.target.value;
		setSearch(value);

		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			handleSearch(search);
		}, 300);
	};
	return (
		<div className="relative w-[90%] flex items-center mx-auto">
			<input
				type="text"
				className="flex lg:hidden my-4 w-full mx-auto py-2 px-8 outline-none rounded-[50px]"
				placeholder="Search.."
				onChange={onInputChange}
			/>
			{search.length > 0 && (
				<div className="absolute top-[10vh] p-2 h-max max-h-[100vh] overflow-y-scroll w-full bg-white z-30 border">
					{results.length > 0 && (
						<>
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
												{result.name}
											</p>
											<p className="text-sm font-semibold">
												{result.username}
											</p>
										</div>
									</div>
									<Link
										href={`profile/${result._id}`}
										target="_blank"
										rel="noreferrer"
										className="bg-[#1f1c20] text-white text-center px-4 py-2 my-4 rounded-md"
									>
										View
									</Link>
								</div>
							))}
						</>
					)}
				</div>
			)}
			<span className="absolute md:hidden right-4 p-2 cursor-pointer">
				<img
					src="/assets/magnifying-glass.png"
					width={20}
					height={20}
					alt=""
				/>
			</span>
		</div>
	);
}
