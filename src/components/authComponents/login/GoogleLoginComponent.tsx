import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

interface params {
  iconOnly?: boolean;
  label?: string;
}

const GoogleLoginComponent = ({ iconOnly = false, label = "Sign in with Google" }: params) => {
  const [userToken, setUserToken] = useState<Omit<
    TokenResponse,
    "error" | "error_description" | "error_uri"
  > | null>(null);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserToken(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const getUserInfo = async () => {
      // call backend and send access token to register/login user
      await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userToken?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };

    if (userToken) {
      console.log(userToken);

      getUserInfo();
    }
  }, [userToken]);

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
