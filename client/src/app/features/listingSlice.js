import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dummyListings } from "../../assets/assets";
import api from "../../configs/axios";


//Get all public listings

export const getAllPublicListing = createAsyncThunk("listing/getAllPublicListing", async ()=>{
    try {
        const {data} = await api.get('/api/listing/public')
        return data;
    } catch (error) {
        console.log(error)
        return [];
        
    }
})

//Get all user listings

export const getAllUserListings = createAsyncThunk("listing/getAllUserListing", async () =>{
    try {
        
    } catch (error) {
        console.log(error)
        return [];
        
    }
})

const listingSlice = createSlice({
    name:"listing",
    initialState:{
        listings : [],
        userListings: [],
        balance:{
            earned: 0,
            withdrawn: 0,
            available: 0

        }
    },
    reducers:{
        setListings: (state, action)=>{
            state.listings = action.payload
        }
    }

})

export const {setListings}=listingSlice.actions;

export default listingSlice.reducer