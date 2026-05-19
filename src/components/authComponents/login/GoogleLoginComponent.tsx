import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface params {
  iconOnly?: boolean;
  label?: string;
}

const GoogleLoginComponent = ({ iconOnly = false, label = "Sign in with Google" }: params) => {
  // TODO: Google auth — wire up useGoogleLogin + backend integration
  // See CLAUDE.md > Future Implementation

  if (iconOnly) {
    return (
      <button className="" type="button" onClick={() => {}}>
        <FontAwesomeIcon icon={faGoogle} style={{ color: "black" }} />
      </button>
    );
  } else {
    return (
      <button
        className="flex items-center w-full justify-center gap-3 px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200 text-white text-sm font-medium cursor-pointer"
        type="button"
        onClick={() => {}}
      >
        <FontAwesomeIcon icon={faGoogle} className="text-blue-primary text-base" style={{ display: 'block', transform: 'translateY(-1px)' }} />
        <span style={{ lineHeight: 1 }}>{label}</span>
      </button>
    );
  }
};

export default GoogleLoginComponent;
