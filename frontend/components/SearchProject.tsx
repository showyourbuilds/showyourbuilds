"use client";
import React, { useState } from "react";
import Alert from "./Alert";

export default function SearchProject() {
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const openAlert = () => {
		setIsAlertOpen(true);
	};

	const closeAlert = () => {
		setIsAlertOpen(false);
	};

    const handleSearch = async () => {
        setAlertMessage("Search");
        openAlert();
    }
	return (
		<div className="relative w-[80%] flex items-center mx-auto">
			<Alert
				isOpen={isAlertOpen}
				onClose={closeAlert}
				message={alertMessage}
			/>
			<input
				type="text"
				className="flex md:hidden my-4 w-full mx-auto py-2 px-8 outline-none rounded-[50px] bg-gray-200"
				placeholder="Search.."
			/>
            <span className="absolute md:hidden right-4 p-2 cursor-pointer" onClick={() => handleSearch()}><img src="/assets/magnifying-glass.png" width={20} height={20} alt="" /></span>
		</div>
	);
}
