import { configureStore } from "@reduxjs/toolkit";
import projectSlice from './ProjectList'
import userSlice from './UserList'
export const store  = configureStore({
    reducer:{
     project:projectSlice,
     user:userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch