"use client";
import Navbar from "@/components/navbar/page";
import React from "react";
export default async function Home() {
	const arr = [1,2,3,4,5,6,7];
	return (
		<>
			<Navbar />
			<input
				type="text"
				className="flex md:hidden my-8 w-[80%] mx-auto py-3 px-8 outline-none rounded-[50px] bg-gray-200"
				placeholder="Search.."
			/>
			<div className="flex w-[90%] mx-auto flex-wrap md:justify-around justify-center mt-4">
				{arr.map((tem) => {
					return(
						<div key={tem} className="md:w-[27%] w-[95%] min-w-[270px] my-8 flex flex-col border justify-between items-center">
							<div className="w-full h-[300px] bg-gray-200"></div>
							<div className="w-[90%] flex flex-col mx-auto justify-between">
								<p className="text-[1.5rem] py-4 font-bold">
									Product Name &nbsp;<span className="text-[1rem] font-light my-2 text-gray-600">$20.00</span>
								</p>
								<div className="w-full flex justify-between items-center">
									<p className="p-1 text-green-600 font-semibold text-[10px]">in stock</p>
									<p className="text-[12px] text-gray-600 p-1">4.7/5</p>
								</div>
								<p className="text-[0.8rem] my-2">
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ut nihil voluptate explicabo, assumenda obcaecati.
								</p>
								<div className="flex justify-around items-center w-full my-4">
									<button className="w-[40%] border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem]">Buy now</button>
									<button className="w-[40%] border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem]">Add to Cart</button>
								</div>
							</div>
						</div>
					)
				})}	
			</div>
		</>
	);
}
	