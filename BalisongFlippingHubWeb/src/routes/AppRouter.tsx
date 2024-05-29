import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { RegisterPage } from "../pages/RegisterPage";
import { ProfilePage } from "../pages/ProfilePage";

export const AppRouter = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes /> }>
                    <Route path="/me" element={<ProfilePage />} />
                </Route>

                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>    
        </BrowserRouter>
    )
}