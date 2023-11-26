import authReducer from "./features/authSlice";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PURGE,
	PERSIST,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = { key: "palettlepulsedev", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const reduxstore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [
					FLUSH,
					PERSIST,
					PURGE,
					REGISTER,
					REHYDRATE,
					PAUSE,
				],
			},
		} as any),
});
export const store = reduxstore;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;