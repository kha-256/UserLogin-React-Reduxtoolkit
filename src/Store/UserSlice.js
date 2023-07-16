import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//funtion to call user login api


export const userLogin= createAsyncThunk(
    'user/loginUser',

)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: "false",
        user: null,
        error: null
    }

})

export default userSlice.reducer;