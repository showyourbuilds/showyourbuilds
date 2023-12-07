import React from "react";
import data from "../public/dummyproducts.json";
import ComposedLayout from "@/components/layouts/ComposedLayout";
import Link from "next/link";
export default async function Home() {
	return (
		<ComposedLayout>
			<input
				type="text"
				className="flex md:hidden my-8 w-[80%] mx-auto py-3 px-8 outline-none rounded-[50px] bg-gray-200"
				placeholder="Search.."
			/>
			<p className="text-3xl text-center font-thin font-serif my-8">
				Let your{" "}
				<span className="text-gray-500 font-serif">Projects</span> speak
			</p>
			<div className="flex w-[90%] mx-auto justify-center mt-4">
				<div className="flex md:w-[70%] w-full flex-col items-center">
					<p className="text-2xl font-thin font-sans my-4 flex items-center justify-center">
						Some of the top viewed Projects of the week
						<img
							src="/assets/down-arrow.png"
							alt="arrow"
							className="w-6 mx-2 mt-2 animate-bounce"
						/>
					</p>
					<div className="flex flex-col h-max w-full items-center justify-center">
						{data.map((item) => (
							<div key={item.id} className="w-[70%] h-fit mx-auto my-4 rounded-lg">
								<div className="w-full aspect-video bg-gray-400 rounded-t-lg"></div>
								<div className="w-full rounded-b-lg border">
									<div className="flex items-center py-2 px-4">
										<p className="text-2xl font-serif">Learnwithme</p>
										<p className="text-[13px] font-thin text-gray-500 ml-2 mt-1 font-sans">9/22 - 3/23</p>
									</div>
									<div className="flex justify-between flex-col px-4 py-2">
										<p className="text-sm italic font-sans">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet, dignissimos est voluptate incidunt necessitatibus ratione, debitis nulla quia itaque natus tenetur consequuntur!</p>
										<p className="flex mt-2"><img width={20} src="/assets/account.png" alt="" /><span className="ml-2 text-sm font-semibold font-sans">Anirudh Patel</span></p>
									</div>
									<div className="flex flex-col justify-between p-4">
										<p className="text-sm font-semibold font-sans my-2">Tech Stack</p>
										<div className="flex flex-wrap w-full">
											<div className="border rounded-lg py-1 px-3 min-w-[40px]"><span className="text-[12px]">React</span></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="md:flex hidden flex-col md:w-[30%] w-full">
					<p className="text-2xl font-thin font-sans my-4 flex items-center justify-center">
						Top creators of the week
					</p>
				</div>
			</div>
		</ComposedLayout>
	);
}

Home.getLayout = function getLayout(page: any) {
	<ComposedLayout>{page}</ComposedLayout>;
};
