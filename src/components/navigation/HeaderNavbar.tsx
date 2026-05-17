import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faEarthAmericas,
  faCircleInfo,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";

const linkClass = "flex justify-center items-center gap-2 text-white/80 hover:text-blue-primary transition-colors duration-200 relative group whitespace-nowrap xsm:border-b xsm:border-white/10 xsm:pb-4 xsm:pt-2 nav:border-b-0 nav:py-0";
const activeLinkClass = "text-blue-primary";
const divider = <span className="xsm:hidden nav:block w-px h-4 bg-white/20 flex-shrink-0" />;

const HeaderNavbar = () => {
  return (
    <nav className="flex nav:justify-center xsm:gap-4 nav:gap-3 nav:text-sm lg:text-base xsm:text-lg nav:flex-row xsm:flex-col xsm:h-auto nav:h-auto xsm:pt-2 xsm:pb-6 nav:py-0 xsm:px-6 nav:px-0 nav:items-center">

      <NavLink to="/community" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}>
        {({ isActive }) => (<>
          <FontAwesomeIcon icon={faGlobe} className="nav:hidden" />
          <span>Community</span>
          <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-primary transition-all duration-200 group-hover:w-full ${isActive ? "w-full" : "w-0"}`} />
        </>)}
      </NavLink>

      {divider}

      <NavLink to="/tutorial-center" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}>
        {({ isActive }) => (<>
          <FontAwesomeIcon icon={faHubspot} className="nav:hidden" />
          <span>Tutorial Center</span>
          <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-primary transition-all duration-200 group-hover:w-full ${isActive ? "w-full" : "w-0"}`} />
        </>)}
      </NavLink>

      {divider}

      <NavLink to="/product-world" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}>
        {({ isActive }) => (<>
          <FontAwesomeIcon icon={faEarthAmericas} className="nav:hidden" />
          <span>Product World</span>
          <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-primary transition-all duration-200 group-hover:w-full ${isActive ? "w-full" : "w-0"}`} />
        </>)}
      </NavLink>

      {divider}

      <NavLink to="/contact-us" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ""}`}>
        {({ isActive }) => (<>
          <FontAwesomeIcon icon={faPhoneFlip} className="nav:hidden" />
          <span>Contact Us</span>
          <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-primary transition-all duration-200 group-hover:w-full ${isActive ? "w-full" : "w-0"}`} />
        </>)}
      </NavLink>

      {divider}

      <NavLink to="/about-page" className={({ isActive }) => `${linkClass} xsm:border-b-0 nav:border-b-0 ${isActive ? activeLinkClass : ""}`}>
        {({ isActive }) => (<>
          <FontAwesomeIcon icon={faCircleInfo} className="nav:hidden" />
          <span>About</span>
          <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-primary transition-all duration-200 group-hover:w-full ${isActive ? "w-full" : "w-0"}`} />
        </>)}
      </NavLink>

    </nav>
  );
};

export default HeaderNavbar;
