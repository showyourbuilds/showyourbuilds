import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import { SocketProvider } from "@/config/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ShowYourBuilds",
	description: "let your projects speak",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={inter.className}>
				<SocketProvider>
					<ReduxProvider session={session}>{children}</ReduxProvider>
					<Analytics />
				</SocketProvider>
			</body>
			<script
				src="https://kit.fontawesome.com/eae0ccc16c.js"
				crossOrigin="anonymous"
			></script>
		</html>
	);
}
