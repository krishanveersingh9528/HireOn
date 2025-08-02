import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            // ✅ Reset everything when logging out
            state.user = null;
            state.loading = false;
        }
    },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
