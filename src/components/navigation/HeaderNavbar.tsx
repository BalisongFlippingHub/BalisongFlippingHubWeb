import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faEarthAmericas,
  faCircleUser,
  faPlus,
  faCubes,
  faCircleInfo,
  faPhoneFlip,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ProfileImageDisplay from "../ProfileImageDisplay";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../../redux/hooks";

interface params {
  closeNavigation: () => void
}

const HeaderNavbar = ({ closeNavigation }: params) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

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

  return (
    <>
      <div className="w-full flex z-10">
        <nav className="md:w-60 xsm:w-full bg-black z-10 text-white">
           <div className="flex flex-col">
         <NavLink
          to="/community"
          style={navlinkStyles}
          className="p-3 pl-4 w-full  flex items-center justify-between"
        >
          <FontAwesomeIcon icon={faGlobe} />
          <h1>Community</h1>
        </NavLink>

        <NavLink
          to="/tutorial-center"
          style={navlinkStyles}
          className="p-3 pl-4 w-full  flex items-center justify-between"
        >
          <FontAwesomeIcon icon={faHubspot} />
          <h1>Tutorial Center</h1>
        </NavLink>

        <NavLink
          to="/product-world"
          style={navlinkStyles}
          className="p-2 pl-4 w-full  flex items-center justify-between"
        >
          <FontAwesomeIcon icon={faEarthAmericas} />
          <h1>Product World</h1>
        </NavLink>
        {accessToken && user ? (
          <>
            <div className="flex justify-between p-2 items-center  bg-black">
              <div className="flex items-center gap-2">
                {user?.profileImg ? (
                  <div className="rounded-full h-10 w-10 overflow-hidden">
                    <ProfileImageDisplay />
                  </div>
                ) : (
                  <></>
                )}

                <h3>Me</h3>
              </div>

              <FontAwesomeIcon icon={faChevronDown} />
            </div>

            <NavLink
              to={`/${user?.displayName}/${user?.identifierCode}`}
              style={navlinkStyles}
              className="p-2 pl-4 w-full  flex items-center justify-between"
            >
              <FontAwesomeIcon icon={faCircleUser} />
              <h1 className="bg-inherit">Profile</h1>
            </NavLink>

            <NavLink
              to={`/${user?.displayName}/${user?.identifierCode}/collection`}
              style={profileNavLinkStyles}
              className="p-2 pl-4 w-full  flex items-center justify-between"
            >
              <FontAwesomeIcon icon={faCubes} />
              <h1 className="bg-inherit">Collection</h1>
            </NavLink>

            <NavLink
              to="/create-post"
              style={profileNavLinkStyles}
              className="p-2 pl-4 w-full  flex items-center justify-between"
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
          className="p-3 pl-4 w-full flex items-center justify-between"
        >
          <FontAwesomeIcon icon={faPhoneFlip} />
          <h1>Contact Us</h1>
        </NavLink>

        <NavLink
          to="/about-page"
          style={navlinkStyles}
          className="p-3 pl-4 w-full  flex items-center justify-between"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
          <h1>About Page</h1>
        </NavLink>

        <div className="flex items-center justify-center p-2">
          <h4 className="">@ All rights reserved</h4>
        </div>
      </div>
        </nav>

        
        <div onClick={() => closeNavigation()} className="w-full h-screen bg-black/[.5] sm:relative xsm:absolute z-10"></div>
      </div>
    </>
  );
};

export default HeaderNavbar;
