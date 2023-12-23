import User from "@/config/models/User"
import connect from '@/config/db';
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    await connect();
    const { editedUser } = await req.json();
    const user = await updateProfile(editedUser);
    if (user?.acknowledged) {
        const newUser = await getProfile(editedUser._id as string);
        return NextResponse.json({ user: newUser, status: 200 });
    } else {
        return NextResponse.json({ message: "User not found", status: 404  });
    }
}

export const GET = async (req:any) => {
    await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const user = await getProfile(id as string);
    if (user) {
        return NextResponse.json({ user: user, status: 200 });
    } else {
        return NextResponse.json({ message: "User not found", status: 404 });
    }
}

async function getProfile(id: string) {
    const user = await User.findOne({ _id: id });
    if (user) {
        return user;
    }
    return null;
}

async function updateProfile(data: any) {
    const id = data._id;
    const user = await User.findOne({ _id: id });
    if (user) {
        const updatedUser = await User.updateOne({ _id: id }, {...data, bio: data.bio || ""});
        return updatedUser;
    }
    return null;
}