import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import HeadRoom from "react-headroom";

const MainLayout = () => {
  return (
    <>
      <HeadRoom>
        <Header />
      </HeadRoom>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
