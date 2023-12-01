"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar/page";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Navbar />
				{children}
			</PersistGate>
		</Provider>
	);
}
