import { SetStateAction, createContext, useEffect, useState } from "react";
import { Profile } from "../modals/User";

export type AuthContextType = {
    user: Profile | null,
    token: string | null,
    newlyCreatedPost: string,
    isLoggedIn: () => boolean; 
    setUser: React.Dispatch<SetStateAction<Profile | null>>,
    setToken: React.Dispatch<SetStateAction<string | null>>,
    setNewlyCreatedPost: React.Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<Profile | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [newlyCreatedPost, setNewlyCreatedPost] = useState<string>("")

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        // check for user already logged in
        setToken("Fill")
        setUser({
            id: "1",
            email: "tzenisekj@gmail.com",
            role: "USER",
            posts: [],
            profileImg: null,
            bannerImg: null,
            displayName: "QSwKLegacy",
            ownedKnives: [],
            facebookLink: "",
            instagramLink: "",
            twitterLink: "",
        })
        setIsReady(true);
    }, [])

    const isLoggedIn = () => {
        console.log("checking log in status: " + !!user)

        return !!user; 
    }

    return (
        <AuthContext.Provider value={{ user, token, newlyCreatedPost, isLoggedIn, setUser, setToken, setNewlyCreatedPost}}>
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