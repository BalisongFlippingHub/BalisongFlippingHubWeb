import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
