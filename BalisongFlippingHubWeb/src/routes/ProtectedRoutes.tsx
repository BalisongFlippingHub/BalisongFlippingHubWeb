import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLE } from "../modals/User";

type Props = {
    allowedRoles: ROLE[]
}

const ProtectedRoutes = ({ allowedRoles }: Props) => {
    const { isLoggedIn, user } = useAuth(); 
    const location = useLocation()

    return (
       isLoggedIn() && allowedRoles.includes(user?.role!)
       ? 
       <Outlet /> 
       :  isLoggedIn() ? <Navigate to="/unauthorized" state={{ from: location }} replace /> :
       <Navigate to="/login" state={{ from: location }} replace/>
    )
}

export default ProtectedRoutes;