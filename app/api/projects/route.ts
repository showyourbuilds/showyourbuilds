import User from '@/config/models/User';
import Project from '@/config/models/Project';
import { NextResponse } from 'next/server';
import connect from '@/config/db';

export const GET = async (req: any) => {
    const projects = await getProjects();
    if (projects) {
        return NextResponse.json({ projects: projects, status: 200 });
    } else {
        return NextResponse.json({ message: "Projects not found", status: 404 });
    }
}

async function getProjects() {
    try{
        await connect();
        const projects = await Project.find().populate({
            path: 'owner',
            model: User,
            select: 'image socials username name'
        }).sort({
            createdAt: -1,
            'views.total': -1,
        });

        return projects;
    } catch (error) {
        console.log(error);
        return null;
    }
}