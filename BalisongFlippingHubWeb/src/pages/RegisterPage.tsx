import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"

export const RegisterPage = () => {
    const [accountType, changeType] = useState("User")

    return (
        <div>
           <div>
            <div>
                <h2>User</h2>
                <h2>Maker</h2>
            </div>
            <div>

            </div>
           </div>
        </div>
    )
}