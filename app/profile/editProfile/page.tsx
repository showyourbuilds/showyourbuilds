"use client";
import LoadingPage from "@/components/LoadingPage";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

const animatedComponents = makeAnimated();

const linkOptions = [
	{ value: "twitter", label: "Twitter" },
	{ value: "instagram", label: "Instagram" },
	{ value: "facebook", label: "Facebook" },
	{ value: "github", label: "Github" },
	{ value: "linkedin", label: "Linkedin" },
	{ value: "portfolio", label: "Portfolio" },
];

export default function EditProfile() {
	const { data: session, update } = useSession();
	const user = session?.user as any;
	const router = useRouter();
	
	const [loading, setLoading] = useState(false);
	const [newLinks, setNewLinks] = useState(
		[] as { label: string; link: string }[]
	);
	const [availableOptions, setAvailableOptions] = useState(
		[] as { value: string; label: string }[]
	);
	const [editedUser, setEditedUser] = useState({ ...user } as any);

	async function getAvailableOptions(links: any) {
		const existingLabels = await links.map(
			(link: { label: string; link: string }) => link.label
		);
		const filteredOptions = await linkOptions.filter(
			(option) => !existingLabels.includes(option.label)
		);
		return filteredOptions;
	}

	useEffect(() => {
		getAvailableOptions(editedUser.socials).then((availableOpt) => {
			setAvailableOptions(availableOpt);
		});
	}, []);

	const handleRemoveLink = async (index: number) => {
		const updatedSocials = [...editedUser.socials];
		updatedSocials.splice(index, 1);
		setEditedUser({ ...editedUser, socials: updatedSocials });
		const availableOpt = (await getAvailableOptions(updatedSocials)) as {
			value: string;
			label: string;
		}[];
		setAvailableOptions(availableOpt);
	};

	const handleAddLink = (selectedOptions: any) => {
		if (selectedOptions.length === 0) {
			setNewLinks([]);
		} else {
			const newLinksToAdd = selectedOptions.map((option: any) => ({
				label: option.label,
				link: "",
			}));
			setNewLinks([...newLinksToAdd]);
		}
	};

	const handleEditUser = async () => {
		setLoading(true);
		const res = await fetch("/api/profile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				editedUser,
			}),
		});
		const response = await res.json() as any;
		if(response.status === 200){
			router.push(`/profile/${user?._id}`);
			update();
			setLoading(false);
		} else {
			setLoading(false);
		}
	};
	
	return (
		<ComposedLayout>
			<div className={`${loading ? "block" : "hidden"}`}>
				<LoadingPage />
			</div>
			<div className="md:w-[50%] w-[90%] mx-auto my-4">
				<div className="w-full aspect-[3/1] relative" id="header">
					<img src="/assets/header.jpeg" className="w-full" alt="" />
					<img
						src={session?.user?.image || "/assets/account.png"}
						className="absolute w-[10%] z-[10] rounded-[50%] border-white bg-white left-4 bottom-[15px]"
						alt=""
					/>
				</div>
				<div
					className="w-full h-max flex flex-col bg-white relative"
					id="profile"
				>
					<div
						className="flex w-full px-2 my-2 justify-between mx-auto"
						id="profile-user-info"
					>
						<div className="flex flex-col">
							<input
								type="text"
								value={editedUser?.name}
								placeholder={session?.user?.name || "name"}
								className="text-[1.5rem] font-sans font-bold outline-none border my-2 p-2"
								onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
							/>
							<input
								type="text"
								value={editedUser?.username}
								placeholder={user?.username || "@username"}
								className="text-[1rem] text-gray-500 font-sans font-thin outline-none border my-2 p-2"
								onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
							/>
						</div>
					</div>
					<div
						className="flex w-full px-2 my-4 flex-col justify-center"
						id="profile-bio"
					>
						<textarea
							name="bio"
							id="bio"
							cols={20}
							rows={5}
							value={editedUser?.bio}
							className="text-[1rem] border p-2 font-semibold font-sans"
							placeholder={user?.bio || "Enter your Bio...."}
							onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
						></textarea>
					</div>
					<Select
					components={animatedComponents}
					styles={{
						input: (provided) => ({
							...provided,
							color: "#374151",
							boxShadow: "none",
							fontWeight: "thin",
							"& > input:focus": {
								boxShadow: "none",
							},
						}),
						control: (provided) => ({
							...provided,
							border: "none",
							color: "#374151",
							borderRadius: "none",
							borderBottom: "1px solid rgb(229, 231, 235)",
							boxShadow: "none",
							":focus": {
								boxShadow: "none",
							},
						}),
						option: (provided) => ({
							...provided,
							color: "gray",
							backgroundColor: "white",
							boxShadow: "none",
							fontWeight: "thin",
							":focus": {
								boxShadow: "none",
							},
						}),
					}}
					className={
						"border-b-gray-200 focus:shadow-none text-gray-500 font-thin my-8"
					}
					placeholder="Add more links to your Project"
					isMulti
					options={availableOptions}
					onChange={(selectedOptions) => {
						handleAddLink(selectedOptions);
					}}
				/>
				{editedUser?.socials?.map(
					(link: { label: string; link: string }, index: number) => (
						<div
							key={index}
							className="flex items-center my-4 w-full"
						>
							<img
								src="/assets/link.png"
								className="w-[20px] mx-4"
								alt=""
							/>
							<span className="mx-2 text-gray-700 font-sans">
								{link.label}
							</span>
							<span className="text-gray-500 mx-2 underline font-sans">
								{link.link}
							</span>
							<button
								className="mx-4 border border-gray-300 rounded-lg hover:border-gray-600 text-[10px] text-gray-400 p-2"
								onClick={() => handleRemoveLink(index)}
							>
								Remove
							</button>
						</div>
					)
				)}
				{newLinks.map(
					(link: { label: string; link: string }, index: number) => {
						return (
							<div
								key={index}
								className="flex items-center my-2 w-[50%]"
							>
								<input
									type="text"
									className="border-0 focus:ring-0 focus:border-gray-400 border-b-2 border-b-gray-200 font-thin font-sans my-6 w-[90%]"
									placeholder={`Enter ${link.label} link`}
									value={link.link}
									onChange={(e) => {
										const updatedSocials = [
											...newLinks,
										] as {label: string, link: string}[];
										updatedSocials[index] = {
											...link,
											link: e.target.value,
										};
										setNewLinks(updatedSocials);
									}}
								/>
								<img
									src="/assets/link.png"
									className="w-[5%]"
									alt=""
								/>
							</div>
						);
					}
					)}
					<button onClick={() => {
						setEditedUser({ ...editedUser, socials: [...editedUser.socials, ...newLinks] })
						setNewLinks([])
					}} className={`w-[20%] ${newLinks.length === 0 ? "hidden" : "flex"} hover:border-gray-600 p-2 border rounded-lg mx-2 mb-8 text-gray-400 text-[10px]`}>Save Links</button>
					<div className="w-[90%] mx-auto h-[0.2px] bg-gray-300 my-4"></div>
					<button
						className="border border-gray-400 font-sans font-thin text-[#626262] hover:border-black py-2 px-4 h-[80%] w-full md:mt-4 md:mx-2 mx-auto rounded-[10px]"
						onClick={handleEditUser}
					>
						Save
					</button>
				</div>
			</div>

			<div className="w-[50%] my-2 h-[0.5px] mx-auto bg-gray-300"></div>
		</ComposedLayout>
	);
}
