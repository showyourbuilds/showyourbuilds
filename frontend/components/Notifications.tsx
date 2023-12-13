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
						<div aria-label="navigation" className="py-2">
							<nav className="grid gap-1">
								<a
									href="/"
									className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
								>
									<span>Account Settings</span>
								</a>
								<a
									href="/"
									className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
								>
									<span>Contact Us</span>
								</a>
							</nav>
						</div>
						
						<div aria-label="footer" className="pt-2">
							<button
								type="button"
								className="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                                onClick={() => signOut()} 
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="w-7 h-7"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									></path>
									<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
									<path d="M9 12h12l-3 -3"></path>
									<path d="M18 15l3 -3"></path>
								</svg>
								<span>Logout</span>
							</button>
						</div>
						{/* Add more items as needed */}
					</div>
				</div>
			)}
		</div>
	);
};

export default Notifications;
