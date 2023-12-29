"use client";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
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
	{ value: "website", label: "website" },
];
const animatedComponents = makeAnimated();

export default function CreateProject() {
	const { data: session } = useSession() as {
		data: any;
	};
	const router = useRouter();

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
	const [stack, setStack] = useState([]);
	const [title, setTitle] = useState("" as string);
	const [snapshots, setSnapshots] = useState([] as any);
	const [description, setDescription] = useState("" as string);
	const [repository, setRepository] = useState({} as any);
	const [links, setLinks] = useState(
		[] as { label: string; link: string }[]
	);
	const [moreLinks, setMoreLinks] = useState([] as {label: string, value: string}[]);
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
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		getRepositories();
	}, [session]);

	const handleAddProject = async () => {
		setLoading(true);
		try {
			const lastUpdated = await calculateLastUpdatedTime(
				repository?.updated_at
			);
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
							const project = await fetch(
								`/api/projects/addProject`,
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										Accept: "application/json",
									},
									body: JSON.stringify({
										title: title,
										desc: description,
										links: links,
										repoLink: repository?.html_url,
										snapshots: [url],
										techStack: stack,
										duration: lastUpdated,
										owner: session?.user?._id,
									}),
								}
							);
							if (project.status === 200) {
								setLoading(false);
								router.push(`/`);
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
					Create Project
				</h1>
				<div
					className={`w-full mx-auto my-4 flex-col ${
						snapshots.length > 0 ? "flex" : "hidden"
					}`}
				>
					<p className="text-gray-500 my-2 font-sans font-thin">
						Project's Snapshot
					</p>
					<img
						className="md:w-[50%] w-full"
						src={snapshots[0]?.preview || ""}
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
				>
					{({ getRootProps, getInputProps }) => (
						<section className="my-4">
							<div
								{...getRootProps()}
								className="border-2 border-dashed border-gray-400 rounded-md p-4 my-4"
							>
								<input {...getInputProps()} />
								<p className="text-xl font-semibold text-gray-400">
									{snapshots[0]?.name ||
										"Drag 'n' drop Project's snapshot here, or click to select file"}
								</p>
							</div>
						</section>
					)}
				</Dropzone>
				<input
					type="text"
					className="border-0 focus:ring-0 focus:border-gray-400 border-b-2 border-b-gray-200 font-semibold font-sans my-6"
					placeholder="Enter Project's title"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<textarea
					className="border-0 focus:ring-0 focus:border-gray-400 border-b-2 border-b-gray-200 font-semibold font-sans my-6"
					placeholder="Enter Project's Description"
					rows={3}
					cols={20}
					style={{ resize: "none" }}
					onChange={(e) => {
						setDescription(e.target.value);
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
					placeholder="Choose the tech used in your project...."
					onChange={(e: any) => {
						setStack(e);
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
					options={repos}
					placeholder="Select Project's Repository...."
					onChange={(e: any) => {
						setRepository(e);
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
							color: '#374151',
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
					isMulti
					className={
						"border-b-gray-200 focus:shadow-none text-gray-500 font-thin my-8"
					}
					options={linkOptions}
					placeholder="Add more links to your Project"
					onChange={(e: any) => {
						setMoreLinks(e);
					}}
				/>
				{moreLinks.length > 0 ? (
					<>
						{moreLinks.map((link, index: number) => (
							<div key={index} className="flex items-center my-2 w-[50%]">
								<input
									type="text"
									className="border-0 focus:ring-0 focus:border-gray-400 border-b-2 border-b-gray-200 font-thin font-sans my-6 w-[90%]"
									placeholder={`Enter ${link.label} link`}
									onChange={(e) => {
										const updatedLinks = [...links];
										updatedLinks[index] = {
											label: link.label,
											link: e.target.value,
										};
										setLinks(updatedLinks);
									}}
								/>
								<img src="/assets/link.png" className="w-[5%]" alt="" />
							</div>
						))}
					</>
				) : (
					<></>
				)}
				<button
					className="w-[30%] min-w-[50px] border border-gray-400 font-sans font-thin text-[#626262] hover:border-black hover:border-[2px] rounded-[20px] py-2 px-4 my-4"
					onClick={handleAddProject}
				>
					Add Project
				</button>
			</div>
		</ComposedLayout>
	);
}
