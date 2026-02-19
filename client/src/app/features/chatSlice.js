import {createSlice} from "@reduxjs/toolkit"

const chatSlice= createSlice({
    name: "chat",
    initialState: {
        listing: null,
        isOpen: false,
        chatId: null,
    },
    reducers:{
        setChat: (state, action)
    }
})