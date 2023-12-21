import Project from "@/config/models/Project";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const projects = await Project.find({ owner: id });
    if (projects.length > 0) {
        return NextResponse.json({ projects: projects, status: 200 });
    } else {    
        return NextResponse.json({ message: "Projects not found", status: 404 });
    }
};
