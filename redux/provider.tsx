"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import SessionProvider from "@/redux/SessionProvider";
import React from "react";
import { SocketContext, socket } from "@/config/context/SocketContext";
export async function ReduxProvider({
	children,
	session
}: {
	children: React.ReactNode,
	session: any,
}) {
	return (
		<SocketContext.Provider value={socket}>
			<SessionProvider session={session}>
				<Provider store={store}>
					<PersistGate persistor={persistor}>{children}</PersistGate>
				</Provider>
			</SessionProvider>
		</SocketContext.Provider>
	);
}
