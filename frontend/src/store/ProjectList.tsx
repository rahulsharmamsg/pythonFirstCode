import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../common/types/task.schema";
type projectState = {
    project:Project[]
}
const initialState:projectState = {
    project: []
}

const projectSlice = createSlice({
    name:"Project",
    initialState,
    reducers:{
        allProject:(state,action:PayloadAction<Project[]>)=>{
            state.project = action.payload
        }

    }
})
export const {allProject} = projectSlice.actions
export default projectSlice.reducer;