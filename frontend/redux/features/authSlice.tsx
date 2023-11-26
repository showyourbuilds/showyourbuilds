import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
    mode: string;
    user: object | null;
    token: string | null;
    isLoggedIn: boolean;
};

const authSlice = createSlice({
	name: "auth",
	initialState: {
        mode: 'light',
		user: null,
		token: null,
		isLoggedIn: false,
	} as initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<any>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
        setMode: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark'
            } else {
                state.mode = 'light'
            }
        }
	},
});

export const { setLogin, setLogout, setMode } = authSlice.actions;
export default authSlice.reducer;