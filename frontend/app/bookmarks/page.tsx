"use client"
import ComposedLayout from "@/components/layouts/ComposedLayout";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
	const bookmarks = useSelector(
		(state: any) => state.bookmarks
	) as any[];
	return (
		<ComposedLayout>
			<div>
				{bookmarks.map((bookmark: string) => {
					return <div key={bookmark}>{bookmark}</div>;
				})}
			</div>
		</ComposedLayout>
	);
}
