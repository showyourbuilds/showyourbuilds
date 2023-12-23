import React from "react";
import data from "../public/dummyproducts.json";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import ProjectCard from "@/components/ProjectCard";
import UserPreview from "@/components/UserPreview";
import SearchProject from "@/components/SearchProject";

export default async function Home() {
	return (
		<ComposedLayout>
			<p className="md:text-3xl text-2xl text-center font-thin font-serif my-6">
				Let your{" "}
				<span className="text-gray-500 font-serif">Projects</span> speak
			</p>
			<SearchProject />
			<div className="flex w-[90%] mx-auto justify-center mt-4">
				<div className="flex md:w-[70%] w-full flex-col items-center">
					<p className="md:text-2xl text-sm font-thin font-sans my-4 flex items-center justify-center">
						Some of the top viewed Projects of the week
						<img
							src="/assets/down-arrow.png"
							alt="arrow"
							className="md:w-6 w-[14px] mx-2 mt-2 animate-bounce"
						/>
					</p>
					<div className="flex flex-col h-max w-full items-center justify-center">
						{data.map((item) => (
							<ProjectCard item={item} key={item.id} />
						))}
					</div>
				</div>
				<div className="md:flex hidden flex-col md:w-[30%] w-full">
					<p className="text-2xl font-thin font-sans my-4 flex items-center justify-center">
						Top creators of the week
					</p>
					<div className="flex flex-col w-[70%] mx-auto">
						{data.map((item) => {
							return (
								<UserPreview key={item as any} user={{name: "Anirudh Patel"}} />
							)
						})}
					</div>
				</div>
			</div>
		</ComposedLayout>
	);
}

Home.getLayout = function getLayout(page: any) {
	<ComposedLayout>{page}</ComposedLayout>;
};
