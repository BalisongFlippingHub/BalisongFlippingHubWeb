import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faEarthAmericas,
  faCircleUser,
  faPlus,
  faP,
  faCubes,
  faCircleInfo,
  faPhoneFlip,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";
import useAuth from "../../hooks/useAuth";
import Image from "../Image";

interface params {
  lgScreenFullNavDisplay: boolean;
}

const HeaderNavbar = ({ lgScreenFullNavDisplay }: params) => {
  const { isLoggedIn, user } = useAuth();

  const navlinkStyles = ({ isActive }: any) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      backgroundColor: isActive ? "#003333" : "inherit",
    };
  };

  const profileNavLinkStyles = ({ isActive }: any) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      backgroundColor: isActive ? "teal" : "inherit",
    };
  };

  if (!lgScreenFullNavDisplay) {
    return (
      <nav className="fixed h-[calc(100%_-_64px)] lg:w-48 translate-y-[64px] border-r border-shadow-green-offset flex flex-col justify-between bg-black z-8 xsm:w-full xsm:h-5/6 md:w-1/3 xsm:border-b-2 md:border-b-none md:h-[calc(100%_-_64px)] xsm:border-shadow-green-offset z-10">
        <div className="flex flex-col">
          <NavLink
            to="/community"
            style={navlinkStyles}
            className="p-3 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
          >
            <FontAwesomeIcon icon={faGlobe} />
            <h1>Community</h1>
          </NavLink>

          <NavLink
            to="/tutorial-center"
            style={navlinkStyles}
            className="p-3 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
          >
            <FontAwesomeIcon icon={faHubspot} />
            <h1>Tutorial Center</h1>
          </NavLink>

          <NavLink
            to="/product-world"
            style={navlinkStyles}
            className="p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
          >
            <FontAwesomeIcon icon={faEarthAmericas} />
            <h1>Product World</h1>
          </NavLink>
          {isLoggedIn() ? (
            <>
              <div className="flex justify-between p-2 items-center border-b-2 border-shadow-green-offset bg-black">
                <div className="flex items-center gap-2">
                  <div className="rounded-full h-10 w-10 overflow-hidden">
                    <Image imageId={user?.profileImg!} />
                  </div>
                  <h3>Me</h3>
                </div>

                <FontAwesomeIcon icon={faChevronDown} />
              </div>

              <NavLink
                to="/me"
                style={navlinkStyles}
                className="p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
              >
                <FontAwesomeIcon icon={faCircleUser} />
                <h1 className="bg-inherit">Profile</h1>
              </NavLink>

              <NavLink
                to="/me/collection"
                style={profileNavLinkStyles}
                className="p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
              >
                <FontAwesomeIcon icon={faCubes} />
                <h1 className="bg-inherit">Collection</h1>
              </NavLink>

              <NavLink
                to="/me/create-post"
                style={profileNavLinkStyles}
                className="p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
              >
                <FontAwesomeIcon icon={faPlus} />
                <h1 className="bg-inherit">Create Post</h1>
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full flex flex-col justify-center">
          <NavLink
            to="/contact-us"
            style={navlinkStyles}
            className="p-3 pl-4 w-full border-b-2 border-t-2 border-shadow-green-offset flex items-center justify-between"
          >
            <FontAwesomeIcon icon={faPhoneFlip} />
            <h1>Contact Us</h1>
          </NavLink>

          <NavLink
            to="/about-page"
            style={navlinkStyles}
            className="p-3 pl-4 w-full border-b-2 border-shadow-green-offset flex items-center justify-between"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <h1>About Page</h1>
          </NavLink>

          <div className="flex items-center justify-center p-2">
            <h4 className="">@ All rights reserved</h4>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed lg:h-[calc(100%_-_64px)] lg:w-16 translate-y-[64px] border-r border-shadow-green-offset flex flex-col justify-between bg-black z-8 xsm:w-full xsm:h-full z-8">
        <div className="flex flex-col">
          <NavLink
            to="/community"
            style={navlinkStyles}
            className="h-16 p-3 pl-4 w-full border-b-2 border-shadow-green-offset flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faGlobe} />
          </NavLink>

          <NavLink
            to="/tutorial-center"
            style={navlinkStyles}
            className="h-16 p-3 pl-4 w-full border-b-2 border-shadow-green-offset flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faHubspot} />
          </NavLink>

          <NavLink
            to="/product-world"
            style={navlinkStyles}
            className="h-16 p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faEarthAmericas} />
          </NavLink>
          {isLoggedIn() ? (
            <>
              <div className="flex justify-between p-2 items-center border-b-2 border-shadow-green-offset bg-black">
                <h3>Me</h3>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>

              <NavLink
                to="/me"
                style={navlinkStyles}
                className="h-16 p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faCircleUser} />
              </NavLink>

              <NavLink
                to="/me/collection"
                style={profileNavLinkStyles}
                className="h-16 p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faCubes} />
              </NavLink>

              <NavLink
                to="/me/create-post"
                style={profileNavLinkStyles}
                className="h-16 p-2 pl-4 w-full border-b-2 border-shadow-green-offset flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faPlus} />
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full flex flex-col justify-center">
          <NavLink
            to="/contact-us"
            style={navlinkStyles}
            className="h-16 p-3 pl-4 w-full border-b-2 border-t-2 border-shadow-green-offset flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faPhoneFlip} />
          </NavLink>

          <NavLink
            to="/about-page"
            style={navlinkStyles}
            className="h-16 p-3 pl-4 w-full flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </NavLink>
        </div>
      </nav>
    );
  }
};

export default HeaderNavbar;
