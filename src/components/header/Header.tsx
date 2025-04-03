import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderProfileDisplay from "./HeaderProfileDisplay";
import HeaderNavbar from "../navigation/HeaderNavbar";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HeaderNavbarBottom from "../navigation/HeaderNavbarBottom";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const [navToggle, toggleNav] = useState(false);
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);

  const [currURL, setCurrURL] = useState("");

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const location = useLocation();

  const closeNavigation = () => {
    toggleNav(false);
  };

  const toggleSearchBar = () => {
    setSearchBarToggle((prev) => !prev);
  };

  useEffect(() => {
    setCurrURL(location.pathname);
  }, []);

  useEffect(() => {
    if (location.pathname !== currURL) {
      setCurrURL(location.pathname);
      closeNavigation();

      if (accountToggle) {
        setAccountToggle(false);
      }
    }
  }, [location]);

  return (
    <>
      <header className="flex fixed justify-between items-center h-12 w-full p-3 bg-black z-10">
        {/*Search Bar for small screens*/}
        {searchBarToggle ? (
          <div className="w-full xsm:fixed z-10 justify-center flex bg-black xsm:visible md:collapse md:absolute">
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
            {!navToggle ? (
              <FontAwesomeIcon icon={faBarsStaggered} />
            ) : (
              <h2>X</h2>
            )}
          </div>

          <h1 onClick={() => navigate("/")} className="hover:cursor-pointer">
            Balisong Flipping Center
          </h1>
        </div>

        {/*Profile Display or Login/Registration Btn and Search Bar Toggle*/}
        <div className="flex items-center sm:gap-4 xsm:gap-2">
        <div className="md:visible md:static xsm:collapse xsm:absolute justify-self-center">
          <SearchBar toggleSearchBar={toggleSearchBar} />
        </div>
        
          <div
            className="xsm:visible xsm:static md:collapse md:absolute hover:cursor-pointer"
            onClick={() => toggleSearchBar()}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          {user && accessToken ? (
            <HeaderProfileDisplay />
          ) : (
            <div className="flex gap-1 items-center text-lg">
              <button
                type="button"
                className="bg-shadow-green-offset pl-4 pr-4 pt-1 pb-1 rounded-lg hover:bg-shadow-green-offset border border-black hover:border-white"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </header>

      <aside>
        {navToggle ? <HeaderNavbar closeNavigation={closeNavigation} /> : <></>}
      </aside>

      {user && accessToken ? (
        <aside className="lg:collapse lg:absolute fixed bg-black bottom-0 w-full z-10 flex justify-center border-t-2 border-shadow-green">
          <HeaderNavbarBottom />
        </aside>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
