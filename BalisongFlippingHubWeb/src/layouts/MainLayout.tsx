import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="p-20">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout; 