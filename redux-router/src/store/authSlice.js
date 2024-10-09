import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 1,
    isLoggedIn: true,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },

})

export default userSlice.reducer;