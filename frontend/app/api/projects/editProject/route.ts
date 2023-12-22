import connect from '@/config/db';
import Project from '@/config/models/Project';
import { NextResponse } from 'next/server';

// edit the project
export const POST = async (req: any) => {
    await connect();
    const { newProject } = await req.json();
    const project = await editProject(newProject);
    if (project) {
        return NextResponse.json({ project: project, status: 200 });
    } else {
        return NextResponse.json({ message: "Project not found", status: 404 });
    }
}

async function editProject(newProject: any) {
    const editedProject = newProject;
    const project = await Project.findOneAndUpdate({ _id: editedProject._id }, { $set: editedProject }, { new: true });
    if (project) {
        return project;
    }
    return null;
}