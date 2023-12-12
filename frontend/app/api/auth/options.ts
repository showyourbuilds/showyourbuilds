import { AuthOptions, Session } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/config/models/User";
import connect from "@/config/db";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

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
				try {
					await connect();
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
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({
			user,
			account,
		}: {
			user: AuthUser | AdapterUser;
			account: Account | null;
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
		async jwt({ token, account, profile }) {
			if (account) {
				if (account.provider == "credentials") {
					token.provider = "credentials";
					token = { ...token };
				} else if (account.provider == "github") {
					token.accessToken = account.accessToken;
					token.provider = "github";
					token.id = profile?.sub;
				}
			}
			return token;
		},
		async session({ session, token }: { session: any; token: JWT }) {
			if (token.provider == "credentials") {
				await connect();
				const res = await User.findOne({ _id: token.sub as string });
				delete res.password;
				session.user = res;
				session.token = token;
				return session;
			} else if (token.provider == "github") {
				await connect();
				const res = await User.findOne({
					email: token.email as string,
				});
				if (!res) {
					const newUser = new User({
						name: token.name as string,
						email: token.email as string,
						provider: "github",
						image: token.picture as string,
					});
					await newUser.save();
					session.user = newUser;
					session.token = token;
					return session;
				} else {
					delete res.password;
					session.user = res;
					session.token = token;
					return session;
				}
			}
		},
	},
};
