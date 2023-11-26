"use client";
import Navbar from "@/components/navbar/page";
import React from "react";
import { useSelector } from "react-redux";
export default async function Home () {
	const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
	return (
		<>
      <Navbar />
			<p>Home page it is</p>
		</>
	);
}
