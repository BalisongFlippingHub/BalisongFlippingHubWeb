
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const navigate = useNavigate()
    const { setUser, setToken } = useAuth()

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const handleOnChangeEmail = (e: any) => {
        setEmail(e.target?.value)
        if (buttonDisabled) {
            setButtonDisabled(false)
        }
    } 

    const handleOnChangePassword = (e: any) => {
        setPassword(e.target?.value)
        if (buttonDisabled) {
            setButtonDisabled(false)
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        const obj = {
            email: email,
            password: password
        }

        setIsLoading(true)
        axios.request({
            url: "/auth/login",
            method: "post",
            data: obj
        })
        .then((res) => {
            console.log("Logging user in response:", res)
            if (res.status === 200) {
                setToken(res.data.token)
                setUser(res.data.account)
                navigate("/community")
            }
        })
        .catch((err) => {
            console.log("Loggin user in error: ", err)
            setErrMsg("* Error logging in with current credientials.")
            setError(true)
            emailRef.current?.focus()
            setButtonDisabled(true)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    /*
    Function ran on component load
    - Focuses the user to the email input field
    - TODO- Autofills email and password fields with users credentials when user has selected the "Remember Me" checkbox
    */
    useEffect(() => {
        emailRef.current?.focus()
    },[])

    /*HTML return for login form component*/
    return (
        <section className="flex w-full h-full">
            <form className="m-auto p-6 flex flex-col bg-shadow-green-offset rounded-lg w-2/6 text-xl" onSubmit={handleSubmit}>
                <h2 className="m-auto text-3xl font-bold bg-shadow-green-offset">Login</h2>

                {/*Display of errors or alerts during use of login form*/}
                {
                    error
                    ?
                    <p className="text-red-400 bg-shadow-green-offset">{errMsg}</p>
                    :
                    <p className="text-shadow-green-offset bg-shadow-green-offset">Fill</p>
                }

                {/*Email input field*/}
                <div className="flex flex-col mb-2 bg-shadow-green-offset">
                    <label htmlFor="emailInput" className="mb-2 bg-shadow-green-offset font-semibold">Email</label>
                    <input
                        type="email"
                        id="emailInput"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => handleOnChangeEmail(e)}
                        placeholder="example@email.com"
                        value={email}
                        required
                        className="text-white p-2 rounded-lg border border-black bg-shadow-green-offset"
                    />
                </div>

                {/*Password input field*/}
                <div className="flex flex-col bg-shadow-green-offset">
                    <label htmlFor="passwordInput" className="mb-1 bg-shadow-green-offset font-semibold">Password</label>
                    <input
                        type="password"
                        id="passwordInput"
                        ref={passwordRef}
                        onChange={(e) => handleOnChangePassword(e)}
                        value={password}
                        required
                        className="p-2 rounded-lg border border-black bg-shadow-green-offset"
                    />
                </div>

                {/*Check box for allowing the site to remember specific users*/}
                {/*TODO- logic to enable saving and use of information*/}
                <div className="mt-2 bg-shadow-green-offset">
                    <input type="checkbox" id="rememberMe" className="mr-2"/>
                    <label htmlFor="rememberMe" className="bg-shadow-green-offset">Remember Me</label>
                </div>

                {/*Submit button to login*/}
                {
                    isLoading
                    ?
                    <button disabled className="p-2 bg-shadow-green-offset rounded mt-3">Loading...</button>
                    :
                        buttonDisabled
                        ?
                        <button type="submit" disabled className="p-2 rounded mt-3 bg-shadow-green">Login</button>
                        :
                        <button type="submit" className="hover:cursor-pointer p-2 rounded bg-shadow-green mt-3">Login</button>
                }

                {/*Redirect for users do not have an account.*/}
                <div className="text-lg flex items-center bg-shadow-green-offset mt-2">
                    <p className="bg-shadow-green-offset mr-2">Don't have an account?</p>
                    <h3 className="text-blue hover:text-light-blue hover:cursor-pointer bg-shadow-green-offset" onClick={() => navigate("/register")}>Register Here</h3>
                </div>

                {/*TODO- Create div for oath loggins*/}
            </form>
        </section>
        
    )
}

export default LoginForm; 