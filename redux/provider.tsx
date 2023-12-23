"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { getServerSession } from "next-auth";
import SessionProvider from "@/redux/SessionProvider";
import React from "react";
export async function ReduxProvider({
	children,
	session
}: {
	children: React.ReactNode,
	session: any,
}) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>{children}</PersistGate>
			</Provider>
		</SessionProvider>
	);
}
