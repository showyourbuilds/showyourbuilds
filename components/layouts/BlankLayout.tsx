import React from "react";

export default function BlankLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<main>{children}</main>
		</div>
	);
}
