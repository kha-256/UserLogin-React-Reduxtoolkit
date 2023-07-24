import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

//funtion to call user login api
let initialState = {
    user: "",
    token: "",
    loading: false,
    error: null
  };
  export const userLogin = createAsyncThunk(
    'user',
    async (body) => {
      try {
        const response = await axios.post("http://localhost:5000/login", body, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        return response.data;
      } catch (error) {
        // Handle errors if needed
        throw error;
      }
    }
  );

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=localStorage.getItem("token")
        },
        addUser:(state,action)=>{
            state.user=localStorage.getItem("user")
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(userLogin.pending,(state,action)=>{
            state.loading= true;
            state.user= null;
            state.error= null;
           
        })
        .addCase(userLogin.fulfilled, (state, action) => {
    state.loading = false;
    console.log("API Response:", action.payload); // Add this line to log the entire API response
    const { user, token } = action.payload;
    console.log("Token received from API:", token); // Add this line to log the token value
    state.error=null;
    state.token = token;
    state.user = user;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
})
        .addCase(userLogin.rejected,(state,action)=>{
            state.loading= false;
            console.log(action.error.message); 
            if(action.error.message === "Request failed with status code 401") {
              state.error="Access Denied!  Invalid Credentials"
            }
            else{
              state.error= action.error.message;
            }
           
        })

    }

})


export const {addUser,addToken}= UserSlice.actions
export default UserSlice.reducer;