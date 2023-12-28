import Project from "@/config/models/Project";
import { NextResponse } from "next/server";
export const POST = async (req: any, res: any) => {
	const body = await req.json();
    let project = await Project.findById(body.projectId);
    if (!project) return NextResponse.json({ message: "Project not found", status: 404 });
    console.log(project);
    if (!project.views.users.includes(body.userId)) {
      project.views.total += 1;
      project.views.users.push(body.userId);
    } else {
        return NextResponse.json({ message: "Project not found", status: 404 });
    }
    const response = await project.save();
    if (response.acknowledged) return NextResponse.json({ message: "success", status: 200 });
};
