import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { getServerSession } from "next-auth";
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
					<ReduxProvider session={session}>{children}</ReduxProvider>
				<script
					src="https://kit.fontawesome.com/eae0ccc16c.js"
					crossOrigin="anonymous"
				></script>
			</body>
		</html>
	);
}
