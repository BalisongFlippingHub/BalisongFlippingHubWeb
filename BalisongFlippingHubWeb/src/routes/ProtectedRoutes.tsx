import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectedRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const location = useLocation();

  return !user && !accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/community" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
