import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="h-screen lg:ml-[calc(160px)] lg:pt-[64px] bg-shadow-green">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout; 