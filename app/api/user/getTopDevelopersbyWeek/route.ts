import User from '@/config/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
    const users = await getusers();
    if (users) {
        return NextResponse.json({ users: users, status: 200 });
    } else {
        return NextResponse.json({ message: "users not found", status: 404 });
    }
}

async function getusers() {
    const users = await User.find()
    if (users) {
        return users;
    }
    return null;
}