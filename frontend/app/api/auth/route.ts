import User from '@/config/models/User';
import connect from '@/config/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: any) => {
    const {email, password, name, image} = await req.json();
    await connect();
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        return new NextResponse('User already exists', {
            status: 400,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        email: email,
        password: hashedPassword,
        name: name,
        image: image || ""
    });
    try {
        const savedUser = await newUser.save();
        console.log("Route.ts signup" + savedUser);
        return NextResponse.json({ user: savedUser, status: 201 });
    } catch (error) {
        return NextResponse.json({ error, status: 201 });
    }
}
