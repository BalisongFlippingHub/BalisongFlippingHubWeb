import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";

export const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuthContext(); 

    return (
       isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
    )
}