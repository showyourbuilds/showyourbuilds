import User from "@/config/models/User"
import connect from '@/config/db';
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    await connect();
    const { tempuser } = await req.json();
    const user = await User.updateOne({ _id: tempuser?._id }, {...tempuser});
    if (user?.acknowledged) {
        const newUser = await getProfile(tempuser._id as string);
        return NextResponse.json({ user: newUser, status: 200 });
    } else {
        return NextResponse.json({ message: "User not found", status: 404  });
    }
}

async function getProfile(id: string) {
    const user = await User.findOne({ _id: id });
    if (user) {
        return user;
    }
    return null;
}