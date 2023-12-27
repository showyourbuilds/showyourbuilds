import { AuthOptions } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "@/config/models/User";
import connect from "@/config/db";
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
					return null;
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
			authorization: {
				params: {
					scope: "repo user:email",
				},
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? "",
			clientSecret: process.env.GOOGLE_SECRET ?? "",
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
			user: AuthUser | any;
			account: Account | null;
		}): Promise<string | boolean> {
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
							username: user?.username as string,
							email: (user?.email as string) || "",
							provider: ["github"],
							bookmarks: [],
						});
						await newUser.save();
						return true;
					} else if (existingUser.provider.includes("google") || existingUser.provider.includes("credentials")) {
						if (existingUser.provider.includes("github")) {
							return true;
						} else {
							const updateUser = await User.findOneAndUpdate(
								{ _id: existingUser._id },
								{
									provider: [
										...existingUser.provider,
										"github"
									],
									image: existingUser.image || user?.image,
								}
							);
							if (updateUser.acknowledged) {
								return true;
							} else {
								return false;
							}
						}
					}
					return true;
				} catch (err) {
					return "error processing the github signup request ";
				}
			} else if (account?.provider == "google") {
				await connect();
				try {
					const existingUser = await User.findOne({
						email: user.email as string,
					});
					if (!existingUser) {
						const username = user.email.split("@")[0];
						const newUser = new User({
							name: user.name as string,
							username: username as string,
							email: (user?.email as string) || "",
							image: user?.image as string,
							bookmarks: [],
							provider: ["google"],
						});
						await newUser.save();
						return true;
					} else if (existingUser.provider.includes("google")) {
						return true;
					} else if (
						existingUser.provider.includes("github") ||
						existingUser.provider.includes("credentials")
					) {
						const updateUser = await User.findOneAndUpdate(
							{ _id: existingUser._id },
							{
								provider: [
									...existingUser.provider,
									account.provider,
								],
							}
						);
						if (updateUser.acknowledged) {
							return true;
						} else {
							return false;
						}
					}
					return true;
				} catch (err) {
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
					token.accessToken = account.access_token;
				} else if (account.provider == "github") {
					token.accessToken = account.access_token;
					token.provider = "github";
					token.username = account?.username;
					token.id = profile?.sub;
				} else if (account.provider == "google") {
					token.accessToken = account.access_token;
					token.provider = "google";
					token.username = account?.username;
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
						username: token.username as string,
						email: token.email as string,
						provider: ["github"],
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
			} else if (token.provider === "google") {
				await connect();
				const res = await User.findOne({
					email: token.email as string,
				});
				if (!res) {
					const newUser = new User({
						name: token.name as string,
						username: token.username as string,
						email: token.email as string,
						provider: ["google"],
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
	pages: {
		signIn: '/auth'
	}
};
