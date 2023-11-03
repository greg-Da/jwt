import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

const loggedIn = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        logIn: (state) => {
            state.value = true
        },
        logOut: (state) => {
            state.value = false
        }
    },
})

export const { logIn, logOut } = loggedIn.actions

export default loggedIn.reducer