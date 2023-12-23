import User from "@/config/models/User";
import connect from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: any) => {
	const { email, password, name, username, image } = await req.json();
	await connect();
	const existingUser = await User.findOne({ email: email });
	if (existingUser) {
		if (existingUser.provider.includes("github")) {
			return NextResponse.json({
				error: "Github account already registered with this Email",
				status: 400,
			});
		} else if (existingUser.provider.includes("google")) {
			return NextResponse.json({
				error: "Google account already registered with this Email",
				status: 400,
			});
		} else {
			return NextResponse.json({
				error: "User already exists with this email",
				status: 400,
			});
		}
	} else {
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = new User({
			email: email,
			username: username,
			password: hashedPassword,
			name: name,
			image: image || "",
			bookmarks: [],
		});
		try {
			const savedUser = await newUser.save();
			return NextResponse.json({ user: savedUser, status: 201 });
		} catch (error) {
			return NextResponse.json({ error, status: 500 });
		}
	}
};
