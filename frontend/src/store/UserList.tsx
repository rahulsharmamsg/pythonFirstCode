import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../common/types/task.schema";
type projectState = {
    user:User[]
}
const initialState:projectState = {
    user: []
}

const userSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        allUser:(state,action:PayloadAction<User[]>)=>{
            state.user = action.payload
        }

    }
})
export const {allUser} = userSlice.actions
export default userSlice.reducer;