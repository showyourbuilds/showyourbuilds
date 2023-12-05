import React from "react";
import data from "@/public/dummyproducts.json";
import ComposedLayout from "@/components/layouts/ComposedLayout";
export default function ProductPage({
	params,
}: {
	params: { product: string };
}) {
	const product = data.find(
		(product) => product.id.toString() === params.product
	);
	return (
		<ComposedLayout>
			<div className="w-[70%] flex md:flex-row flex-col mx-auto my-4">
				<div className="md:w-[60%] w-[50%] mx-auto">
					<img
						src="/assets/demo.jpg"
						className="w-[60%] mx-auto"
						alt="Demo art"
					/>
				</div>
				<div className="md:w-[40%] w-[90%] mx-auto flex flex-col p-4">
					<p className="text-5xl font-serif my-4">
						Legecy of the Seas
					</p>
					<p className="text-[15px] text-gray-700 my-2 font-semibold">
						Present bid amount ${product?.pprice}
					</p>
					<p className="text-[12px] italic text-gray-700">
						ongoing till 1st january 2024
					</p>
					<div className="w-full mx-auto h-[0.2px] my-4 bg-gray-300"></div>
					<p className="text-gray-800 text-[15px] italic">
						"In art, the hand can never execute anything higher than
						the heart can imagine."
					</p>
					<div className="w-full mx-auto h-[0.2px] my-4 bg-gray-300"></div>
					<div className="flex justify-around items-center w-full my-4">
						<button className="w-[80%] mx-auto border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-4 text-[15px] font-serif">
							Bid Now
						</button>
					</div>
					<div className="w-full mx-auto h-[0.2px] my-4 bg-gray-300"></div>
                    <p className="text-[15px] font-sans font-semibold">Listed by</p>
                    <div className="flex my-4 hover:border-gray-500 hover:border border border-transparent py-2">
						<i className="fa-solid me-4 ml-2 fa-user-circle text-[1.5rem] md:text-[2rem]"></i>
                        <p className="text-[15px] my-2 font-serif">
                            James Clerk
                        </p>
                    </div>
				</div>
			</div>
            <div className="w-[60%] mx-auto h-[0.2px] my-4 bg-gray-300"></div>
			<div className="w-[70%] flex mx-auto p-4 my-4">
				<p className="text-[15px] italic">
					"Legacy of the Seas" unveils a haunting glimpse into a
					bygone maritime era. Painted by the elusive artist known
					only as S. Marlowe, the masterpiece tells the story of a
					fleet of ancient warships that once sailed the turbulent
					seas. These venerable vessels, now aged and weathered, stand
					stoically against the backdrop of a setting sun."
				</p>
			</div>
		</ComposedLayout>
	);
}
