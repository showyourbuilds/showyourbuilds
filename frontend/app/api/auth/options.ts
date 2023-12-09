import { AuthOptions, Profile } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/config/models/User";
import connect from "@/config/db";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any) {
				await connect();
				try {
					const user = await User.findOne({
						email: credentials.email,
					});
					if (user) {
						const isPasswordCorrect = await bcrypt.compare(
							credentials.password,
							user.password
						);
						if (isPasswordCorrect) {
							return user;
						}
					}
				} catch (err: any) {
					throw new Error(err);
				}
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
			profile(profile) {
				return {
				  id: profile.id.toString(),
				  name: profile.name ?? profile.login,
				  username: profile.login,
				  email: profile.email,
				  image: profile.avatar_url,
				};
			},
		}),
	],
	callbacks: {
		async signIn({
			user,
			account
		}: {
			user: AuthUser | AdapterUser,
			account: Account | null,
		}) {
			if (account?.provider == "credentials") {
				return true;
			} else if (account?.provider == "github") {
				await connect();
				try {
					const existingUser = await User.findOne({
						email: user.email as string,
					});
					if (!existingUser) {
						const newUser = new User({
							name: user.name as string,
							email: user.email as string,
							provider: "github",
						});
						await newUser.save();
						return true;
					}
					return true;
				} catch (err) {
					console.log("Error saving user", err);
					return false;
				}
			} else {
				return false;
			}
		},
	},
};