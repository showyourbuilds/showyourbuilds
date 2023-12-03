import User from '@/config/models/User';
import connect from '@/config/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: any) => {
    const {email, password, name} = await req.json();
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
    });
    try {
        await newUser.save();
        return new NextResponse('User created', {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error as any, {
            status: 500,
        });    
    }
}
