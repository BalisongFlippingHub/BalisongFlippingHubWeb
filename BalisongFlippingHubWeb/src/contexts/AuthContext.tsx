import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface User {
    token: boolean
}

export type AuthContextType = {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User>({token: true})

    // add functions here and add to value object plus prototypes to AuthContextType

    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
}

export default AuthProvider;