import React from "react";
import data from '../public/dummyproducts.json';
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
			
			<div className="flex w-[90%] mx-auto flex-wrap justify-center mt-4">
				{data.map((item) => {
					return(
						<Link className="md:w-[27%] w-[95%] min-w-[270px] my-8 flex flex-col border  items-center mx-auto hover:scale-[1.02] transition" key={item.id} href={`/products/${item.id}`}>
							<div>
								<div className="w-full h-[300px] bg-gray-200"></div>
								<div className="w-[90%] flex flex-col mx-auto justify-between">
									<p className="text-[1.5rem] py-4 font-bold">
										{item.pname} &nbsp;<br/><span className="text-[1rem] font-light my-2 text-gray-600">{item.pprice}</span>
									</p>
									<div className="w-full flex justify-between items-center">
										<p className="p-1 text-green-600 font-semibold text-[10px]">{item.pavailability ? "in stock" : "out of stock"}</p>
										<p className="text-[12px] text-gray-600 p-1">4.7/5</p>
									</div>
									<p className="text-[0.8rem] my-2">
										{item.pdescription}
									</p>
									<div className="flex justify-around items-center w-full my-4">
										<button className="w-[40%] border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem]">Buy now</button>
										<button className="w-[40%] border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem]">Add to Cart</button>
									</div>
								</div>
							</div>
						</Link>
					)
				})}	
			</div>
		</ComposedLayout>
	);
}

Home.getLayout = function getLayout(page: any) {
	<ComposedLayout>{page}</ComposedLayout>;
};
	