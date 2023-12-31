import connect from '@/config/db';
import User from '@/config/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req: any) => {
    const { searchParams } = new URL(req.url);
	const timestamp = searchParams.get('timestamp');
    const users = await getusers();
    if (users) {
        return NextResponse.json({ users: users, status: 200 });
    } else {
        return NextResponse.json({ message: "users not found", status: 404, timestamp });
    }
}

async function getusers() {
    await connect();
    const users = await User.find();
    if (users) {
        return users;
    }
    return null;
}