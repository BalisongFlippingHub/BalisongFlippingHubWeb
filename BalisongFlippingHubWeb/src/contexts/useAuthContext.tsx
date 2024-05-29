import { createContext, useContext, useEffect, useState } from "react";
import { MakerProfile, AdminProfile, UserProfile, ROLE } from "../modals/User";

export type AuthContextType = {
    user: UserProfile | MakerProfile | AdminProfile | null,
    token: string | null,
    registerUser: (email: string, password: string) => void; 
    loginUser: (username: string, password: string) => void; 
    logoutUser: () => void; 
    isLoggedIn: () => boolean; 
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | MakerProfile | AdminProfile | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)
    
    

    useEffect(() => {
        // check for user already logged in
        console.log("setting user")
        console.log("Does user exist?: " + !!user)
        setUser({
            email: "test@gmail.com",
            token: "test",
            role: ROLE.USER,
            displayName: "displayName"
        })
        setIsReady(true);
    }, [])
    
    const registerUser = async (email: string, password: string) => {

    }

    const loginUser = async (email: string, password: string) => {

    }

    const logoutUser = async () => {
        
    }

    const isLoggedIn = () => {
        console.log("checking log in status: " + !!user)
        return !!user; 
    }

    return (
        <AuthContext.Provider value={{ loginUser, user, token, isLoggedIn, registerUser, logoutUser }}>
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

export const useAuthContext = () => useContext(AuthContext);