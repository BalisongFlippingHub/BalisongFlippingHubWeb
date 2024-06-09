import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="p-20 flex justify-center h-screen ml-10">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout; 