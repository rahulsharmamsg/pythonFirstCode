import { Navigate, Outlet, replace } from "react-router-dom"
import { isAuthenticated } from "./Auth"

const ProtectedRoute  = ()=>{
    return isAuthenticated() ? <Outlet /> : <Navigate to='/login' replace  />
}

export default ProtectedRoute