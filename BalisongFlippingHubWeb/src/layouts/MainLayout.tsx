import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout; 