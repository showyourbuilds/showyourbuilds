import connect from '@/config/db';
import Project from '@/config/models/Project';
import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
    await connect();
    const { searchParams } = new URL(req.url); 
    const users = await Project.find({ title: { $regex: searchParams.get('query'), $options: 'i' } }) as any[];
    if (users.length > 0) {
        return NextResponse.json({ users: users, status: 200 });
    } else {
        return NextResponse.json({ message: "users not found", status: 404 });
    }
}