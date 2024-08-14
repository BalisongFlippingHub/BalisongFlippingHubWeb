import { SetStateAction, createContext, useEffect, useState } from "react";
import { Profile } from "../modals/User";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
    user: Profile | null,
    token: string | null,
    newlyCreatedPost: string,
    logout: () => void,
    login: () => void,
    isLoggedIn: () => boolean; 
    setUser: React.Dispatch<SetStateAction<Profile | null>>,
    setToken: React.Dispatch<SetStateAction<string | null>>,
    setNewlyCreatedPost: React.Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<Profile | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const [rememberInfo, setToRememberInfo] = useState<boolean>(() => {
        if (localStorage.getItem("remember-user-info")) {
            return true
        }
        else {
            return false
        }
    })
    
    const [newlyCreatedPost, setNewlyCreatedPost] = useState<string>("")

    const [isReady, setIsReady] = useState(false)

    const navigate = useNavigate()

    const isLoggedIn = () => {
        return !!user; 
    }

    const login = () => {

    }

    const logout = () => {
        setUser(null)
        setToken(null)
        navigate("/login")
    }

    useEffect(() => {
        // check for user already logged in
        // setToken("Fill")
        // setUser({
        //     id: "1",
        //     displayName: "QSwKLegacy",
        //     email: "tzenisekj@gmail.com ",
        //     role: "USER",
        //     profileImg: "", 
        //     bannerImg: "",
        //     facebookLink: "",
        //     twitterLink: "",
        //     youtubeLink: "", 
        //     instagramLink: "",
        //     discordLink: "",
        //     posts: [],
        //     accountCreationDate: null
        // })
        setIsReady(true);
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, newlyCreatedPost, logout, login, isLoggedIn, setUser, setToken, setNewlyCreatedPost}}>
            {
                isReady
                ?
                children
                :
                null
            }
        </AuthContext.Provider>
    )
}