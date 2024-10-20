import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import {
  setCredentials,
  setToRememberLoginInfo,
} from "../redux/auth/authSlice";
import { loginWithRefreshToken } from "../redux/auth/authActions";
import { setCollection } from "../redux/collection/collectionSlice";

export type AuthContextType = {
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    // configure app on mount
    // get remember login state
    const toRememberLogin = localStorage.getItem("save-user-info");
    if (toRememberLogin === "true") {
      dispatch(setToRememberLoginInfo());
    }

    // attempt to login user with valid refresh token
    dispatch(loginWithRefreshToken())
      .unwrap()
      .then((res) => {
        dispatch(
          setCredentials({
            newUser: res.data.account,
            newAccessToken: res.data.accessToken,
          })
        );
        dispatch(setCollection(res.data.collection));
        navigate("/community");
      })
      .catch((error) => console.log(error));

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
      }}
    >
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
};
