import User from "@/config/models/User";
import Project from "@/config/models/Project";
import connect from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: any, res: any) => {
    await connect();
    const body = await req.json();
    const idArray = body.bookmarks;
    const projects = await Project.find({ _id: { $in: idArray } }).populate({
        path: 'owner',
        model: User,
        select: 'image socials name'
    });
    if (projects.length > 0) {
        return NextResponse.json({ projects: projects, status: 200 });
    } else {
        return NextResponse.json({
            message: "projects not found",
            status: 404,
        });
    }
}