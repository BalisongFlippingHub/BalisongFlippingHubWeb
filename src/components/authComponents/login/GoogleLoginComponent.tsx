import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

interface params {
  iconOnly: boolean;
}

const GoogleLoginComponent = ({ iconOnly }: params) => {
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
      <button className="" type="button" onClick={() => loginWithGoogle()}>
        <FontAwesomeIcon icon={faGoogle} style={{ color: "black" }} />
      </button>
    );
  } else {
    return (
      <button
        className="flex items-center bg-white rounded-full overflow-hidden justify-center gap-4 pt-3 pb-3 pl-4 pr-4 hover:cursor-pointer hover:scale-105 transition duration-200 ease-in text-xl font-bold"
        type="button"
        onClick={() => loginWithGoogle()}
      >
        <FontAwesomeIcon icon={faGoogle} style={{ color: "black" }} />

        <div className="text-black">
          <h4>Sign in with Google</h4>
        </div>
      </button>
    );
  }
};

export default GoogleLoginComponent;
