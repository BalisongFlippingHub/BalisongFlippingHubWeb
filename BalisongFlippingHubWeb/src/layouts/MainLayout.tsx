import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HeaderNavbar from "../components/HeaderNavbar";

const MainLayout = () => {
    return (
        <>
            <Header />
            <HeaderNavbar />
            <main className="h-screen ml-[calc(160px)] pt-[64px]">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout; 