import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

const MainLayout = () => {
    const [lgScreenFullNavDisplay, setLgScreenFullNavDisplay] = useState(false)

    const toggleLgScreenFullNavDispaly = () => {
        setLgScreenFullNavDisplay((prev) => !prev)
    }

    return (
        <>
            <Header toggleLgScreenFullNavDisplay={toggleLgScreenFullNavDispaly} lgScreenFullNavDisplay={lgScreenFullNavDisplay} />

            {
                !lgScreenFullNavDisplay
                ?
                <main className="h-screen lg:ml-[calc(192px)] pt-[64px] bg-shadow-green">
                    <Outlet />
                </main>
                :
                <main className="h-screen lg:ml-[calc(64px)] pt-[64px] bg-shadow-green">
                    <Outlet />
                </main>
            }
        </>
    )
}

export default MainLayout; 