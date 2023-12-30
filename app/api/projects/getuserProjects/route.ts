import User from "@/config/models/User";
import Project from "@/config/models/Project";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const user = await User.findOne({ username: id });
	if (!user) {
		return NextResponse.json({
			message: "No such user exists",
			status: 200,
		});
	}
	const projects = await Project.find({ owner: user?._id })
		.populate({
			path: "owner",
			model: User,
			select: "image name socials",
		})
		.sort({
			createdAt: -1,
		});
	if (projects.length > 0) {
		return NextResponse.json({ projects: projects, status: 200 });
	} else {
		return NextResponse.json({
			message: "Projects not found",
			status: 404,
		});
	}
};
