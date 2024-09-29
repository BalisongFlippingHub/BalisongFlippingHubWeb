import { SetStateAction, createContext, useEffect, useState } from "react";
import { Profile } from "../modals/User";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
  user: Profile | null;
  token: string | null;
  rememberInfo: boolean;
  newlyCreatedPost: string;
  logout: () => void;
  login: (passed_token: string, passed_user: Profile) => void;
  setRememberInfo: (email: string) => void;
  disableRememberInfo: () => void;
  toggleRememberInfo: () => void;
  isLoggedIn: () => boolean;
  setUser: React.Dispatch<SetStateAction<Profile | null>>;
  setToken: React.Dispatch<SetStateAction<string | null>>;
  setNewlyCreatedPost: React.Dispatch<SetStateAction<string>>;
  setToRememberInfo: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Profile | null>(null);

  const [rememberInfo, setToRememberInfo] = useState<boolean>(true);

  const [newlyCreatedPost, setNewlyCreatedPost] = useState<string>("");

  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = () => {
    return !!user;
  };

  const login = (passed_token: string, passed_user: Profile) => {
    setUser(passed_user);
    setToken(passed_token);
  };

  const setRememberInfo = (email: string) => {
    setToRememberInfo(true);
    localStorage.setItem("remember-user", "true");
    localStorage.setItem("remembered-user-email", email);
  };

  const disableRememberInfo = () => {
    setToRememberInfo(false);
    localStorage.removeItem("remember-user");
    localStorage.removeItem("remembered-user-email");
  };

  const toggleRememberInfo = () => {
    if (rememberInfo) {
      disableRememberInfo();
    } else {
      setToRememberInfo(true);
      localStorage.setItem("remember-user", "true");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    navigate("/login");
  };

  useEffect(() => {
    // check for user already logged in

    // check for remembering user login info
    if (localStorage.getItem("remember-user") === "true") {
      setToRememberInfo(true);
    }

    setToken("Fill");
    setUser({
      id: "1",
      displayName: "Test",
      email: "tzenisekj@gmail.com ",
      role: "USER",
      profileImg: "",
      bannerImg: "",
      facebookLink: "",
      twitterLink: "",
      youtubeLink: "",
      instagramLink: "",
      discordLink: "",
      accountCreationDate: null,
      lastLogin: null,
    });
    setIsReady(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        rememberInfo,
        newlyCreatedPost,
        logout,
        login,
        setRememberInfo,
        disableRememberInfo,
        toggleRememberInfo,
        isLoggedIn,
        setUser,
        setToken,
        setNewlyCreatedPost,
        setToRememberInfo,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
