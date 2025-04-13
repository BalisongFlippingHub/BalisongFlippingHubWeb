import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faEarthAmericas,
  faCircleInfo,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";

const HeaderNavbar = () => {

  const navlinkStyles = ({ isActive }: NavLinkRenderProps) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      borderBottom: isActive ? "2px solid white" : "none"
    };
  };

  return (
    <nav className="flex md:justify-center gap-10 text-lg md:flex-row xsm:flex-col xsm:h-screen md:h-auto">
      <NavLink
        to="/community"
        style={navlinkStyles}
        className="flex justify-center items-center gap-2 hover:scale-125 transition-transform ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faGlobe} />
        <h1>Community</h1>
      </NavLink>

      <NavLink
        to="/tutorial-center"
        style={navlinkStyles}
        className="flex justify-center items-center gap-2 hover:scale-125 transition-transform ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faHubspot} />
        <h1>Tutorial Center</h1>
      </NavLink>

      <NavLink
        to="/product-world"
        style={navlinkStyles}
        className="flex justify-center items-center gap-2 hover:scale-125 transition-transform ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faEarthAmericas} />
        <h1>Product World</h1>
      </NavLink>

      <NavLink
        to="/contact-us"
        style={navlinkStyles}
        className="flex justify-center items-center gap-2 hover:scale-125 transition-transform ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faPhoneFlip} />
        <h1>Contact Us</h1>
      </NavLink>

      <NavLink
        to="/about-page"
        style={navlinkStyles}
        className="flex justify-center items-center gap-2 hover:scale-125 transition-transform ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faCircleInfo} />
        <h1>About Page</h1>
      </NavLink>
    </nav>
  );
};

export default HeaderNavbar;
