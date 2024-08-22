import { SetStateAction, createContext, useEffect, useState } from "react";
import { Profile } from "../modals/User";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
    user: Profile | null,
    token: string | null,
    rememberInfo: boolean,
    newlyCreatedPost: string,
    logout: () => void,
    login: (passed_token: string, passed_user: Profile) => void,
    toggleRememberInfo: (email?: string, password?: string) => void,
    isLoggedIn: () => boolean; 
    setUser: React.Dispatch<SetStateAction<Profile | null>>,
    setToken: React.Dispatch<SetStateAction<string | null>>,
    setNewlyCreatedPost: React.Dispatch<SetStateAction<string>>,
    setToRememberInfo: React.Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<Profile | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const [rememberInfo, setToRememberInfo] = useState<boolean>(false)
    
    const [newlyCreatedPost, setNewlyCreatedPost] = useState<string>("")

    const [isReady, setIsReady] = useState(false)

    const navigate = useNavigate()

    const isLoggedIn = () => {
        return !!user; 
    }

    const login = (passed_token: string, passed_user: Profile) => {
        setUser(passed_user)
        setToken(passed_token)
        localStorage.setItem("saved-user", JSON.stringify(user))
        localStorage.setItem("saved-token", JSON.stringify(token))
    }

    const toggleRememberInfo = (email?: string, password?: string) => {
        if (rememberInfo) {
            if (email && password) {
                localStorage.setItem("remembered-user-email", email)
                localStorage.setItem("remembered-user-password", password)  
            }
        }
        else {
            localStorage.removeItem("remembered-user-email")
            localStorage.removeItem("remembered-user-password")
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem("saved-user")
        localStorage.removeItem("saved-token")

        navigate("/login")
    }

    useEffect(() => {
        // check for user already logged in
        const user_val = localStorage.getItem("saved-user")
        const token_val = localStorage.getItem("saved-token")

        if (user_val && token_val) {
            setUser(JSON.parse(user_val))
            setToken(JSON.parse(token_val))
        }

        setToken("Fill")
        setUser({
            id: "1",
            displayName: "",
            email: "tzenisekj@gmail.com ",
            role: "USER",
            profileImg: "", 
            bannerImg: "",
            facebookLink: "",
            twitterLink: "",
            youtubeLink: "", 
            instagramLink: "",
            discordLink: "",
            posts: [],
            accountCreationDate: null
        })
        setIsReady(true);
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, rememberInfo, newlyCreatedPost, logout, login, toggleRememberInfo, isLoggedIn, setUser, setToken, setNewlyCreatedPost, setToRememberInfo}}>
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