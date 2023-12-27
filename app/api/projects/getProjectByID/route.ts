import Project from '@/config/models/Project';
import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const project = await getProject(id as string);
    if (project) {
        return NextResponse.json({ project: project, status: 200 });
    } else {
        return NextResponse.json({ message: "Project not found", status: 404 });
    }
}

async function getProject(id: string) {
    const project = await Project.findOne({ _id: id });
    if (project) {
        return project;
    }
    return null;
}