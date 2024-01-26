"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SearchUsers() {
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
					{results?.length > 0 && (
						<>
							{results.map((result) => (
								<div className="flex flex-row items-center justify-between border-b border-gray-200 p-4">
									<div className="flex items-center">
										<img
											src={result.image}
											alt=""
											className="w-10 h-10 rounded-[50%]"
										/>
										<div className="flex flex-col ml-4">
											<p className="text-xl">
												{result.name}
											</p>
											<p className="text-sm font-thin">
												{result.username}
											</p>
										</div>
									</div>
									<Link
										href={`profile/${result._id}`}
										target="_blank"
										rel="noreferrer"
										className="px-4 py-2 rounded-md border border-gray-400 text-gray-500"
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
