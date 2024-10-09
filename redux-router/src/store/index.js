import { configureStore } from "@reduxjs/toolkit";


import posts from "./postSlice";
import users from "./authSlice";


const store = configureStore({
    reducer: {
        posts,
        users,
    }
})

export default store;