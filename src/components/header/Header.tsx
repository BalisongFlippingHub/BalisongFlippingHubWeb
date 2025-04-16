import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderProfileDisplay from "./HeaderProfileDisplay";
import HeaderNavbar from "../navigation/HeaderNavbar";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HeaderNavbarBottom from "../navigation/HeaderNavbarBottom";
import { RootState } from "../../redux/store";
import useWindowSize from "../../hooks/useWindowSize";

const Navbar = () => {
  const [navToggle, toggleNav] = useState(true);
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);

  const [currURL, setCurrURL] = useState("");

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();

  const windowSize = useWindowSize();

  const closeNavigation = () => {
    toggleNav(false);
  };

  const toggleSearchBar = () => {
    setSearchBarToggle((prev) => !prev);
  };

  useEffect(() => {
    if (navToggle) {
      if (windowSize.at(1)! < 950) {
        toggleNav(false);
      }
    } else {
      if (windowSize.at(1)! > 950) {
        toggleNav(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.at(1)]);

  useEffect(() => {
    setCurrURL(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.pathname !== currURL) {
      setCurrURL(location.pathname);
      closeNavigation();

      if (accountToggle) {
        setAccountToggle(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <header className="flex flex-col gap-5 items-center sticky top-0 h-18 w-full pt-3 pb-3 md:pl-5 xsm:pl-2 xsm:pr-2 md:pr-5 z-10 text-white backdrop-filter backdrop-blur-xl bg-opacity-0 bg-dark-primary">
        <section className="flex w-full justify-between">
          {/*Search Bar for small screens*/}
          {windowSize.at(1)! < 950 && searchBarToggle ? (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black">
              <SearchBar toggleSearchBar={toggleSearchBar} />
            </div>
          ) : (
            <></>
          )}

          {/*Hamburger Menu and Logo*/}
          <div className="flex md:gap-2 xsm:gap-1 md:text-2xl xsm:text-lg items-center">
            <div
              className="hover:cursor-pointer"
              onClick={() => toggleNav((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faBarsStaggered} />
            </div>

            <h1
              onClick={() => navigate("/")}
              className="hover:cursor-pointer font-bold lg:text-3xl xsm:text-xl"
            >
              Balisong Flipping Center
            </h1>
          </div>

          <div className="flex items-center md:gap-0 xsm:gap-2">
            {windowSize.at(1)! > 950 ? (
              <SearchBar toggleSearchBar={toggleSearchBar} />
            ) : (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                onClick={toggleSearchBar}
                className="cursor-pointer"
              />
            )}

            {user && accessToken ? (
              <HeaderProfileDisplay />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                size="xl"
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </section>

        {navToggle ? (
          <aside className="w-full">
            <HeaderNavbar />
          </aside>
        ) : (
          <></>
        )}
      </header>

      {
        user && accessToken
        ?
        <aside className="fixed bg-black bottom-0 w-full z-10 flex justify-center">
          <HeaderNavbarBottom />
        </aside>
        :
        <></>
      }
    </>
  );
};

export default Navbar;
