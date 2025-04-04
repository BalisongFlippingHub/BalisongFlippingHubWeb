import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useEffect, useState } from "react"



const GoogleLoginComponent = () => {
    const [user, setUser] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri"> | null>(null)

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    })

    useEffect(() => {
        const getUserInfo = async () => {
            await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => console.log(err));
        }

        if (user) {
            console.log(user)

            getUserInfo()
        }
    }, [user])

    return (
        <button className="flex items-center bg-blue justify-between gap-2 p-1 hover:cursor-pointer hover:translate-x-4 hover:-translate-y-2 transition duration-150 ease-in-out rounded text-xl" type="button" onClick={() => loginWithGoogle()}>
            <div className="p-1 pr-2 pl-2 bg-white">
                <FontAwesomeIcon icon={faGoogle} style={{ color: "black",}} />
            </div>

            <div className="text-white">
                <h4>Sign in with Google</h4>
            </div>
        </button>
    )
}

export default GoogleLoginComponent