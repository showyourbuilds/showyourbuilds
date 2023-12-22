"use client";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Dropzone from "react-dropzone";
import Alert from "@/components/Alert";
import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";

const options = [
	{ value: "react", label: "React" },
	{ value: "angular", label: "Angular" },
	{ value: "vue", label: "Vue" },
	{ value: "svelte", label: "Svelte" },
	{ value: "nextjs", label: "Nextjs" },
	{ value: "nuxtjs", label: "Nuxtjs" },
	{ value: "sapper", label: "Sapper" },
	{ value: "gatsby", label: "Gatsby" },
	{ value: "flutter", label: "Flutter" },
	{ value: "reactnative", label: "React Native" },
	{ value: "ionic", label: "Ionic" },
	{ value: "electron", label: "Electron" },
	{ value: "nodejs", label: "Nodejs" },
	{ value: "express", label: "Express" },
	{ value: "django", label: "Django" },
	{ value: "flask", label: "Flask" },
	{ value: "laravel", label: "Laravel" },
	{ value: "springboot", label: "Spring Boot" },
	{ value: "dotnet", label: ".NET" },
	{ value: "dotnetcore", label: ".NET Core" },
	{ value: "java", label: "Java" },
	{ value: "python", label: "Python" },
	{ value: "php", label: "PHP" },
	{ value: "ruby", label: "Ruby" },
	{ value: "c", label: "C" },
	{ value: "cplusplus", label: "C++" },
	{ value: "csharp", label: "C#" },
	{ value: "golang", label: "Golang" },
	{ value: "kotlin", label: "Kotlin" },
	{ value: "rust", label: "Rust" },
	{ value: "scala", label: "Scala" },
	{ value: "swift", label: "Swift" },
	{ value: "typescript", label: "Typescript" },
	{ value: "javascript", label: "Javascript" },
	{ value: "html", label: "HTML" },
	{ value: "css", label: "CSS" },
	{ value: "sass", label: "SASS" },
	{ value: "less", label: "LESS" },
	{ value: "tailwindcss", label: "Tailwind CSS" },
	{ value: "bootstrap", label: "Bootstrap" },
	{ value: "materialui", label: "Material UI" },
	{ value: "chakraui", label: "Chakra UI" },
	{ value: "antdesign", label: "Ant Design" },
	{ value: "vuetify", label: "Vuetify" },
	{ value: "bulma", label: "Bulma" },
	{ value: "semanticui", label: "Semantic UI" },
	{ value: "foundation", label: "Foundation" },
	{ value: "ionic", label: "Ionic" },
	{ value: "nativebase", label: "Native Base" },
	{ value: "quasar", label: "Quasar" },
	{ value: "flutter", label: "Flutter" },
	{ value: "reactnative", label: "React Native" },
	{ value: "ionic", label: "Ionic" },
	{ value: "electron", label: "Electron" },
	{ value: "mongodb", label: "MongoDB" },
	{ value: "mysql", label: "MySQL" },
	{ value: "postgresql", label: "PostgreSQL" },
	{ value: "redis", label: "Redis" },
	{ value: "sqlite", label: "SQLite" },
	{ value: "mariadb", label: "MariaDB" },
	{ value: "oracle", label: "Oracle" },
	{ value: "mssql", label: "MS SQL" },
	{ value: "firebase", label: "Firebase" },
	{ value: "aws", label: "AWS" },
	{ value: "azure", label: "Azure" },
	{ value: "digitalocean", label: "Digital Ocean" },
	{ value: "heroku", label: "Heroku" },
	{ value: "netlify", label: "Netlify" },
	{ value: "vercel", label: "Vercel" },
	{ value: "gcp", label: "GCP" },
	{ value: "nginx", label: "NGINX" },
	{ value: "apache", label: "Apache" },
	{ value: "docker", label: "Docker" },
	{ value: "kubernetes", label: "Kubernetes" },
	{ value: "linux", label: "Linux" },
	{ value: "ubuntu", label: "Ubuntu" },
	{ value: "windows", label: "Windows" },
	{ value: "macos", label: "MacOS" },
	{ value: "raspberrypi", label: "Raspberry Pi" },
	{ value: "arduino", label: "Arduino" },
	{ value: "raspberrypi", label: "Raspberry Pi" },
	{ value: "arduino", label: "Arduino" },
	{ value: "flutter", label: "Flutter" },
	{ value: "reactnative", label: "React Native" },
	{ value: "ionic", label: "Ionic" },
	{ value: "electron", label: "Electron" },
	{ value: "mongodb", label: "MongoDB" },
	{ value: "mysql", label: "MySQL" },
	{ value: "postgresql", label: "PostgreSQL" },
	{ value: "redis", label: "Redis" },
	{ value: "sqlite", label: "SQLite" },
	{ value: "mariadb", label: "MariaDB" },
	{ value: "oracle", label: "Oracle" },
	{ value: "mssql", label: "MS SQL" },
	{ value: "firebase", label: "Firebase" },
	{ value: "aws", label: "AWS" },
	{ value: "azure", label: "Azure" },
	{ value: "digitalocean", label: "Digital Ocean" },
	{ value: "heroku", label: "Heroku" },
	{ value: "netlify", label: "Netlify" },
	{ value: "vercel", label: "Vercel" },
	{ value: "gcp", label: "GCP" },
	{ value: "nginx", label: "NGINX" },
	{ value: "apache", label: "Apache" },
	{ value: "docker", label: "Docker" },
	{ value: "kubernetes", label: "Kubernetes" },
	{ value: "linux", label: "Linux" },
	{ value: "ubuntu", label: "Ubuntu" },
	{ value: "windows", label: "Windows" },
	{ value: "macos", label: "MacOS" },
	{ value: "raspberrypi", label: "Raspberry Pi" },
	{ value: "arduino", label: "Arduino" },
	{ value: "raspberrypi", label: "Raspberry Pi" },
	{ value: "arduino", label: "Arduino" },
	{ value: "flutter", label: "Flutter" },
	{ value: "reactnative", label: "React Native" },
	{ value: "ionic", label: "Ionic" },
	{ value: "electron", label: "Electron" },
	{ value: "mongodb", label: "MongoDB" },
	{ value: "mysql", label: "MySQL" },
	{ value: "postgresql", label: "PostgreSQL" },
	{ value: "redis", label: "Redis" },
	{ value: "sqlite", label: "SQLite" },
	{ value: "mariadb", label: "MariaDB" },
	{ value: "oracle", label: "Oracle" },
	{ value: "mssql", label: "MS SQL" },
	{ value: "firebase", label: "Firebase" },
	{ value: "aws", label: "AWS" },
	{ value: "azure", label: "Azure" },
	{ value: "digitalocean", label: "Digital Ocean" },
	{ value: "heroku", label: "Heroku" },
	{ value: "netlify", label: "Netlify" },
	{ value: "vercel", label: "Vercel" },
	{ value: "gcp", label: "GCP" },
	{ value: "nginx", label: "NGINX" },
	{ value: "apache", label: "Apache" },
	{ value: "docker", label: "Docker" },
	{ value: "kubernetes", label: "Kubernetes" },
	{ value: "linux", label: "Linux" },
	{ value: "ubuntu", label: "Ubuntu" },
	{ value: "windows", label: "Windows" },
	{ value: "macos", label: "MacOS" },
];

const linkOptions = [
	{ value: "twitter", label: "Twitter" },
	{ value: "instagram", label: "Instagram" },
	{ value: "facebook", label: "facebook" },
];
const animatedComponents = makeAnimated();

export default function CreateProject({ params }: { params: any }) {
	const { data: session } = useSession() as {
		data: any;
	};
	const router = useRouter();
	const [oldProject, setOldProject] = useState({} as any);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const openAlert = () => {
		setIsAlertOpen(true);
	};
	const closeAlert = () => {
		setIsAlertOpen(false);
	};

	const [loading, setLoading] = useState(false);

	const [repos, setRepos] = useState([]);
	const [snapshots, setSnapshots] = useState(null as any);
	const [repository, setRepository] = useState({} as any);
	const [newLinks, setNewLinks] = useState(
		[] as { label: string; link: string }[]
	);

	const [availableOptions, setAvailableOptions] = useState(
		[] as { value: string; label: string }[]
	);
	async function getAvailableOptions(links: any) {
		const existingLabels = await links.map(
			(link: { label: string; link: string }) => link.label
		);
		const filteredOptions = await linkOptions.filter(
			(option) => !existingLabels.includes(option.label)
		);
		return filteredOptions;
	}
	const handleRemoveLink = async (index: number) => {
		const updatedLinks = [...oldProject.links];
		updatedLinks.splice(index, 1);
		setOldProject({ ...oldProject, links: updatedLinks });
		const availableOpt = (await getAvailableOptions(updatedLinks)) as {
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
				link: "", // Initialize link with an empty string
			}));
			setNewLinks([...newLinksToAdd]);
		}
		console.log(newLinks);
	};

	async function calculateLastUpdatedTime(updatedAt: string) {
		const lastUpdated = new Date(updatedAt);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZoneName: "short",
		} as any;
		return lastUpdated.toLocaleDateString("en-US", options);
	}

	useEffect(() => {
		if (!session) {
			router.push("/");
		}
	}, []);

	useEffect(() => {
		async function getProject() {
			try {
				const project = await fetch(
					`/api/projects?id=${params.projectid}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					}
				);
				const data = await project.json();
				if (data.status === 200) {
					setOldProject(data.project);
					const availableOpt = (await getAvailableOptions(
						data.project.links
					)) as {
						value: string;
						label: string;
					}[];
					setAvailableOptions(availableOpt);
				}
			} catch (error) {
				console.log(error);
			}
		}
		getProject();
	}, []);

	useEffect(() => {
		async function getRepositories() {
			if (session) {
				try {
					const repo = await fetch(
						`https://api.github.com/users/${session?.user?.username}/repos`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Accept: "application/vnd.github+json",
							},
						}
					);
					if (repo.status === 200) {
						const sortedData = await repo.json().then(
							(data) => {
								data.sort(({ a, b }: { a: any; b: any }) => {
									const dateA = new Date(
										a?.updated_at
									) as any;
									const dateB = new Date(
										b?.updated_at
									) as any;
									return dateB - dateA;
								});
								data.forEach((element: any) => {
									element.label = element.name;
								});
								return data;
							},
							(err) => {
								console.log(err);
							}
						);
						setRepos(sortedData);
						setRepository(
							sortedData.find(
								(repo: any) =>
									repo.html_url === oldProject?.repolink
							)
						);
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		getRepositories();
	}, []);

	const handleEditProject = async () => {
		setLoading(true);
		try {
			const lastUpdated = await calculateLastUpdatedTime(
				repository?.updated_at
			);
			if (snapshots !== null) {
				const projectRef = ref(
					storage,
					`projectSnapshots/${session?.user?.username}/${repository?.name}`
				);
				uploadBytes(projectRef, snapshots[0])
					.then((response) => {
						const imgLinkRef = ref(
							storage,
							`${response.metadata.fullPath}`
						);
						getDownloadURL(imgLinkRef)
							.then(async (url) => {
								let newProject = { ...oldProject };
								newProject.snapshots = [url];
								newProject.duration = lastUpdated;
								const project = await fetch(
									`/api/projects/editProject`,
									{
										method: "POST",
										headers: {
											"Content-Type": "application/json",
											Accept: "application/json",
										},
										body: JSON.stringify({ newProject }),
									}
								);
								if (project.status === 200) {
									setLoading(false);
									router.push(
										`/profile/${session?.user?._id}`
									);
								} else {
									setLoading(false);
									setAlertMessage(
										"Some error occured, please try again later."
									);
									openAlert();
								}
							})
							.catch((error) => {
								console.log(error);
								setLoading(false);
							});
					})
					.catch((error) => {
						console.log(error);
						setLoading(false);
					});
			} else {
				let newProject = { ...oldProject };
				newProject.duration = lastUpdated;
				const project = await fetch(`/api/projects/editProject`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({ newProject }),
				});
				if (project.status === 200) {
					setLoading(false);
					router.push(`/profile/${session?.user?._id}`);
				} else {
					setLoading(false);
					setAlertMessage(
						"Some error occured, please try again later."
					);
					openAlert();
				}
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	return (
		<ComposedLayout>
			<div className={`${loading ? "block" : "hidden"}`}>
				<LoadingPage />
			</div>
			<Alert
				isOpen={isAlertOpen}
				onClose={closeAlert}
				message={alertMessage}
			/>
			<div className="md:w-[50%] w-[90%] flex flex-col mx-auto my-8">
				<h1 className="text-[2rem] font-bold font-serif">
					Edit Project
				</h1>
				<div className={`w-full mx-auto my-4 flex flex-col`}>
					<p className="text-gray-500 my-2 font-sans font-thin">
						Project's Snapshot
					</p>
					<img
						className="md:w-[50%] w-full"
						src={
							snapshots !== null
								? snapshots[0]?.preview
								: oldProject ? oldProject?.snapshots : ""
						}
						alt=""
					/>
				</div>

				<Dropzone
					accept={"image/jpeg, image/jpg, image/png" as any}
					onDrop={(acceptedFiles: any) => {
						const allowedTypes = [
							"image/jpeg",
							"image/jpg",
							"image/png",
						];
						const validFiles = acceptedFiles.filter((file: File) =>
							allowedTypes.includes(file.type)
						);
						if (validFiles.length > 0) {
							setSnapshots(
								validFiles.map((file: File) =>
									Object.assign(file, {
										preview: URL.createObjectURL(file),
									})
								)
							);
						} else {
							setAlertMessage(
								"Invalid file type. Please upload only JPG, JPEG, or PNG files."
							);
							openAlert();
						}
					}}
					multiple={false}
					maxFiles={1}
					onDropRejected={(fileRejections) => {
						console.log(fileRejections);
					}}
				>
					{({ getRootProps, getInputProps }) => (
						<section className="my-4">
							<div
								{...getRootProps()}
								className="border-2 border-dashed border-gray-400 rounded-md p-4 my-4"
							>
								<input {...getInputProps()} />
								<p className="text-xl font-semibold text-gray-400">
									{snapshots !== null
										? snapshots[0]?.name
										: "Drag 'n' drop Project's snapshot here, or click to select file"}
								</p>
							</div>
						</section>
					)}
				</Dropzone>
				<input
					type="text"
					className="border-0 focus:ring-0 focus:border-gray-400 border-b-2 border-b-gray-200 font-semibold font-sans my-6"
					placeholder={oldProject?.title}
					defaultValue={oldProject?.title}
					onChange={(e) => {
						setOldProject({ ...oldProject, title: e.target.value });
					}}
				/>
				<textarea
					className="border-0 focus:ring-0 focus:border-gray-400 border-b-2 border-b-gray-200 font-semibold font-sans my-6"
					placeholder={oldProject?.desc}
					defaultValue={oldProject?.desc}
					rows={3}
					cols={20}
					style={{ resize: "none" }}
					onChange={(e) => {
						setOldProject({ ...oldProject, desc: e.target.value });
					}}
				/>
				<Select
					closeMenuOnSelect={false}
					components={animatedComponents}
					isMulti
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
							borderRadius: "none",
							borderBottom: "1px solid rgb(229, 231, 235)",
							boxShadow: "none",
							":focus": {
								boxShadow: "none",
							},
						}),
					}}
					className={
						"border-b-gray-200 focus:shadow-none text-gray-500 font-sans my-8"
					}
					options={options}
					value={oldProject?.techStack}
					isSearchable
					placeholder="Choose the tech used in your project...."
					onChange={(e: any) => {
						setOldProject({ ...oldProject, techStack: e });
					}}
				/>
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
					value={repository}
					options={repos}
					placeholder="Select Project's Repository...."
					onChange={(e: any) => {
						setRepository(e);
						setOldProject({ ...oldProject, repoLink: e.html_url });
					}}
				/>
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
				{oldProject?.links?.map(
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
							<span className="mx-2 text-gray-700">
								{link.label}
							</span>
							<span className="text-gray-500 mx-2 underline">
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
										const updatedLinks = [
											...newLinks,
										] as {label: string, link: string}[];
										updatedLinks[index] = {
											...link,
											link: e.target.value,
										};
										setNewLinks(updatedLinks);
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
						setOldProject({ ...oldProject, links: [...oldProject.links, ...newLinks] })
						setNewLinks([])
					}} className={`w-[20%] ${newLinks.length === 0 ? "hidden" : "flex"} hover:border-gray-600 p-2 border rounded-lg mx-2 mb-8 text-gray-400 text-[10px]`}>Save Links</button>

				<button
					className="w-[30%] min-w-[50px] border border-gray-400 font-sans font-thin text-[#626262] hover:border-black hover:border-[2px] rounded-[20px] py-2 px-4 my-4"
					onClick={handleEditProject}
				>
					Save Project
				</button>
			</div>
		</ComposedLayout>
	);
}
