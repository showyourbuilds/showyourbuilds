"use client";
import Navbar from "@/components/navbar/page";
import React from "react";
export default async function Home() {
	return (
		<>
			<Navbar />
			<input
				type="text"
				className="flex md:hidden my-8 w-[80%] mx-auto py-4 px-8 outline-none rounded-[50px] bg-gray-200"
				placeholder="Search.."
			/>
		</>
	);
}
