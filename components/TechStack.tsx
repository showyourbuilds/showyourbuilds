import React from "react";

export default function TechStack({ stack }: { stack: Array<{label: string, value: string}> }) {
	var a = 1;
	return (
		<div className="flex flex-col justify-between px-4 items-center">
			<p className="text-sm text-gray-500 font-semibold my-1 font-sans">
				Tech Stack
			</p>
			<div className="flex flex-wrap my-2 w-full">
				{stack.map((item) => {
					return (
						<div key={a++} className="border rounded-lg py-1 px-3 my-1 mx-2 min-w-[40px]">
							<span className="text-[12px]">{item.label}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
