import { SetStateAction, createContext, useEffect, useState } from "react";
import { Profile } from "../modals/User";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useCollection from "../hooks/useCollection";

export type AuthContextType = {
  user: Profile | null;
  accessToken: string | null;
  rememberInfo: boolean;
  newlyCreatedPost: string;
  logout: () => void;
  login: (passed_token: string, passed_user: Profile) => void;
  setRememberInfo: (email: string) => void;
  disableRememberInfo: () => void;
  toggleRememberInfo: () => void;
  isLoggedIn: () => boolean;
  setUser: React.Dispatch<SetStateAction<Profile | null>>;
  setAccessToken: React.Dispatch<SetStateAction<string | null>>;
  setNewlyCreatedPost: React.Dispatch<SetStateAction<string>>;
  setToRememberInfo: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<Profile | null>(null);

  const [rememberInfo, setToRememberInfo] = useState<boolean>(true);

  const [newlyCreatedPost, setNewlyCreatedPost] = useState<string>("");

  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();
  const { getCollectionDataFromBackend } = useCollection();

  const isLoggedIn = () => {
    return !!user;
  };

  const handleTokenRefresh = () => {
    setTimeout(async () => {
      if (!user) return;

      await axios
        .request({
          url: "/auth/refresh-access-token",
          method: "get",
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setAccessToken(res.data);
          handleTokenRefresh();
        })
        .catch((err) => {
          console.log(err);
          logout();
        })
        .finally(() => {});
    }, 60000);
  };

  const login = (passed_token: string, passed_user: Profile) => {
    setAccessToken(passed_token);
    setUser(passed_user);

    handleTokenRefresh();
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

  const logout = async () => {
    setUser(null);
    setAccessToken(null);

    // logout in backend
    axios
      .request({
        url: "/auth/logout",
        method: "post",
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    navigate("/login");
  };

  useEffect(() => {
    // attempt to retrieve user

    // check for remembering user login info
    if (localStorage.getItem("remember-user") === "true") {
      setToRememberInfo(true);
    }

    // setToken("Fill");
    // setUser({
    //   id: "1",
    //   displayName: "Test",
    //   email: "tzenisekj@gmail.com ",
    //   role: "USER",
    //   profileImg: "",
    //   bannerImg: "",
    //   facebookLink: "",
    //   twitterLink: "",
    //   youtubeLink: "",
    //   instagramLink: "",
    //   discordLink: "",
    //   accountCreationDate: null,
    //   lastLogin: null,
    // });
    setIsReady(true);
  }, []);

  useEffect(() => {
    console.log("calling on login");
    if (user && accessToken) {
      getCollectionDataFromBackend(user?.collectionId!);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        rememberInfo,
        newlyCreatedPost,
        logout,
        login,
        setRememberInfo,
        disableRememberInfo,
        toggleRememberInfo,
        isLoggedIn,
        setUser,
        setAccessToken,
        setNewlyCreatedPost,
        setToRememberInfo,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
