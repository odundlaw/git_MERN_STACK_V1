import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {userId: "0", name:"Shittu Odunayo"},
    {userId: "1", name: "Yusuff Olalekan"},
    {userId: "2", name:"Olowolayemo Seun"}
]

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers: {}
});

export default userSlice.reducer;