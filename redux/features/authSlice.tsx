import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
    mode: string;
    bookmarks: any[]; // Update the type of bookmarks to allow any array elements
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        mode: "light",
        bookmarks: [],
    } as initialState,
    reducers: {
        handleBookmark: (state, action) => {
            if (state.bookmarks.includes(action.payload.bookmark as any)) {
                state.bookmarks = state.bookmarks.filter((bookmark) => bookmark !== action.payload.bookmark);
            } else {
                state.bookmarks.push(action.payload.bookmark);
            }
        },
		setMode: (state) => {
			if (state.mode === "light") {
				state.mode = "dark";
			} else {
				state.mode = "light";
			}
		},
	},
});

export const { handleBookmark, setMode } = authSlice.actions;
export default authSlice.reducer;
