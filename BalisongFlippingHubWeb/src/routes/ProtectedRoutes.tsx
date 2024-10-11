import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  allowedRoles: String[];
};

const ProtectedRoutes = ({ allowedRoles }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const location = useLocation();

  return user && accessToken && allowedRoles.includes(user?.role!) ? (
    <Outlet />
  ) : user && accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
