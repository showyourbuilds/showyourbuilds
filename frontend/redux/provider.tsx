"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		// <SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					{children}
				</PersistGate>
			</Provider>
		// </SessionProvider>
	);
}
