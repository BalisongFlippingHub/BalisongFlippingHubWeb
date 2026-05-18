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
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [navToggle, toggleNav] = useState(false);
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const [currURL, setCurrURL] = useState("");

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();
  const { scrollY } = useScroll();

  const toggleSearchBar = () => setSearchBarToggle((prev) => !prev);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? latest;
    if (latest > prev && latest > 40) {
      setHidden(true);
    } else if (prev - latest > 5) {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (location.pathname !== currURL) {
      setCurrURL(location.pathname);
      toggleNav(false);
      if (accountToggle) setAccountToggle(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setCurrURL(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMobile = windowSize.at(1)! < 1150;
  const isSmall = windowSize.at(1)! < 950;

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.353, ease: "easeInOut" }}
        className={`relative flex items-center sticky top-0 w-full px-4 md:px-8 py-3 z-30 text-white backdrop-blur-xl border-b border-white/10 shadow-lg transition-colors duration-500 ${
          location.pathname === "/" ? "bg-transparent" : "bg-blue-primary/40"
        }`}
      >
        {/* Mobile search overlay */}
        {isSmall && searchBarToggle && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-40 px-4">
            <SearchBar toggleSearchBar={toggleSearchBar} />
          </div>
        )}

        {/* Three-column grid: logo | nav | search+icon */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full">

          {/* Left — hamburger (mobile only) + logo */}
          <div className="flex items-center gap-2">
            {isMobile && (
              <div className="hover:cursor-pointer text-xl mr-1" onClick={() => toggleNav((prev) => !prev)}>
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
            )}
            <h1
              onClick={() => navigate("/")}
              className="hover:cursor-pointer font-bold lg:text-2xl xsm:text-lg whitespace-nowrap"
            >
              <span className="text-blue-primary">Balisong</span> Flipping Center
            </h1>
          </div>

          {/* Center — nav links (desktop only) */}
          {!isMobile ? (
            <div className="flex items-center justify-center">
              <HeaderNavbar />
            </div>
          ) : (
            <div />
          )}

          {/* Right — search + user icon */}
          <div className="flex items-center gap-3 justify-end pl-[35px]">
            {!isSmall ? (
              <SearchBar toggleSearchBar={toggleSearchBar} />
            ) : (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="lg"
                onClick={toggleSearchBar}
                className="cursor-pointer"
              />
            )}

            <span className="xsm:hidden md:block w-px h-4 bg-white/20 flex-shrink-0" />

            {user && accessToken ? (
              <HeaderProfileDisplay />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 py-1.5 px-[7px] rounded-full text-blue-primary hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCircleUser} size="xl" />
                <span className="text-sm font-medium whitespace-nowrap xsm:hidden md:inline">Sign In</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile dropdown nav */}
        {isMobile && navToggle && (
          <aside className={`absolute top-full left-0 right-0 w-full backdrop-blur-xl shadow-lg ${
            location.pathname === "/" ? "bg-[#0a0c10]" : "bg-blue-primary/40"
          }`}>
            <HeaderNavbar />
          </aside>
        )}
      </motion.header>

      {user && accessToken && (
        <aside className="fixed bg-black bottom-0 w-full z-10 flex justify-center">
          <HeaderNavbarBottom />
        </aside>
      )}
    </>
  );
};

export default Navbar;
