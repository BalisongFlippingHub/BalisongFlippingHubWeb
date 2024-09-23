import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { useState } from "react";

const MainLayout = () => {
  const [lgScreenFullNavDisplay, setLgScreenFullNavDisplay] = useState(false);

  const toggleLgScreenFullNavDispaly = () => {
    setLgScreenFullNavDisplay((prev) => !prev);
  };

  return (
    <>
      <Header
        toggleLgScreenFullNavDisplay={toggleLgScreenFullNavDispaly}
        lgScreenFullNavDisplay={lgScreenFullNavDisplay}
      />

      {!lgScreenFullNavDisplay ? (
        <main className="h-full w-full">
          <Outlet />
        </main>
      ) : (
        <main className="h-full w-full">
          <Outlet />
        </main>
      )}
    </>
  );
};

export default MainLayout;
