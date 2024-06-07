import { SetStateAction, createContext, useEffect, useState } from "react";
import { MakerProfile, AdminProfile, UserProfile } from "../modals/User";

export type AuthContextType = {
    user: UserProfile | MakerProfile | AdminProfile | null,
    token: string | null,
    isLoggedIn: () => boolean; 
    setUser: React.Dispatch<SetStateAction<UserProfile | MakerProfile | AdminProfile | null>>,
    setToken: React.Dispatch<SetStateAction<string | null>>

}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | MakerProfile | AdminProfile | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        // check for user already logged in
        
        setIsReady(true);
    }, [])

    const isLoggedIn = () => {
        console.log("checking log in status: " + !!user)
        return !!user; 
    }

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, setUser, setToken}}>
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