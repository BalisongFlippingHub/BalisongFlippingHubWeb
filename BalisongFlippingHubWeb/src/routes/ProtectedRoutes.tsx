import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext, AuthContextType, User } from "../contexts/AuthContext";

export const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    return (
       user.token ? <Outlet /> : <Navigate to="/login" />
    )
}