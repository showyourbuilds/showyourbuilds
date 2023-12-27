// components/Dropdown.js
import { signOut } from "next-auth/react";
import React, { useState } from "react";

const Notifications = ({ notifications }: { notifications: any }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					type="button"
					onClick={toggleDropdown}
					onBlur={() => setIsOpen(false)}
					className="flex justify-center w-full p-4 text-sm font-medium"
				>
					<i className="fa-regular fa-bell text-[1rem]"></i>
				</button>
			</div>

			{isOpen && (
				<div className="origin-top-right z-10 absolute right-0 mt-2 w-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						<div>
							<div className="flex flex-col p-4 px-4 py-2">
								<p className="text-sm text-start font-semibold font-sans">Welcome</p>
								<p className="text-[10px] font-thin text-end font-mono">1min ago</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Notifications;
