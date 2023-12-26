import connect from '@/config/db';
import User from '@/config/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
    await connect();
    const { searchParams } = new URL(req.url); 
    const users = await User.find({ name: { $regex: searchParams.get('query'), $options: 'i' } }) as any[];
    if (users.length > 0) {
        return NextResponse.json({ users: users, status: 200 });
    } else {
        return NextResponse.json({ message: "users not found", status: 404 });
    }
}