"use client";

import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistStore(store)}></PersistGate>
			{children}
		</Provider>
	);
}
