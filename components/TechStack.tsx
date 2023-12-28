import React from "react";

export default function TechStack({ stack }: { stack: Array<{label: string, value: string}> }) {
	return (
		<div className="flex flex-col justify-between px-2">
			<div className="flex flex-wrap w-full">
				{stack.map((item, index) => {
					return (
						<div key={index} className="border border-black flex items-center rounded-[15px] py-2 px-4 my-1 mx-2 min-w-[40px] hover:border-transparent hover:bg-black hover:text-white">
							<span className="text-[12px] font-mono">{item.label}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
