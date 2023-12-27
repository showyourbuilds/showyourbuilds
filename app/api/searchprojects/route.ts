import connect from "@/config/db";
import User from "@/config/models/User";
import Project from "@/config/models/Project";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
	await connect();
	const { searchParams } = new URL(req.url);
	const projects = await Project.find({
		title: { $regex: searchParams.get("query"), $options: "i" },
	}).populate({
		path: "owner",
		model: User,
		select: "image name socials",
	});
	if (projects.length > 0) {
		return NextResponse.json({ projects: projects, status: 200 });
	} else {
		return NextResponse.json({
			message: "projects not found",
			status: 404,
		});
	}
};
