
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LoginForm = () => {
    // form refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    // form value state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // error handling state
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    // loading state
    const [isLoading, setIsLoading] = useState(false)

    // button enabling and disabling
    const [buttonDisabled, setButtonDisabled] = useState(false)

    // context functions
    const navigate = useNavigate()
    const { toggleRememberInfo, rememberInfo, setToRememberInfo, login } = useAuth()

    // on mount function
    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const handleOnChangeEmail = (e: any) => {
        setEmail(e.target?.value)
        if (buttonDisabled) {
            setButtonDisabled(false)
        }

        if (error) {
            setError(false)
        }
    } 

    const handleOnChangePassword = (e: any) => {
        setPassword(e.target?.value)
        if (buttonDisabled) {
            setButtonDisabled(false)
        }

        if (error) {
            setError(false)
        }
    }

    const handleCheckboxChange = () => {
        setToRememberInfo((prev) => !prev)
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        if (email.trim() === "" || password.trim() === "") return

        const obj = {
            email: email.trim(),
            password: password.trim()
        }

        {/*Authenticate user in back end*/}
        setIsLoading(true)
        axios.request({
            url: "/auth/login",
            method: "post",
            data: obj
        })
        .then((res) => {
            {/*Successful authorization of user*/}
            console.log("Logging user in response:", res)
            if (res.status === 200) {
                if (rememberInfo) {
                    {/*Save User Info*/}
                    toggleRememberInfo(email, password)
                }
                else {
                    {/*Clear User Info */}
                    toggleRememberInfo()
                }

                login(res.data.token, res.data.account)
                navigate("/community")
            }
        })
        .catch((err) => {
            {/*Error authorizing user with passed credentials*/}
            console.log("Loggin user in error: ", err)
            setErrMsg("*Error logging in with current credientials.*")
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
        <section className="flex w-full h-full justify-center items-center">
            <form className="p-8 flex flex-col gap-3 bg-shadow-green-offset rounded-lg md:w-2/6 xsm:w-4/5 text-xl" onSubmit={handleSubmit}>
                <h2 className="m-auto text-3xl font-bold bg-shadow-green-offset">Login</h2>

                {/*Display of errors or alerts during use of login form*/}
                {
                    error
                    ?
                    <p className="text-red bg-shadow-green-offset m-auto">{errMsg}</p>
                    :
                    <p className="text-shadow-green-offset bg-shadow-green-offset">Fill</p>
                }

                {/*Email input field*/}
                <div className="flex flex-col gap-1 bg-shadow-green-offset">
                    <label htmlFor="emailInput" className=" bg-shadow-green-offset font-semibold">Email</label>
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
                <div className="flex flex-col gap-1 bg-shadow-green-offset">
                    <label htmlFor="passwordInput" className=" bg-shadow-green-offset font-semibold">Password</label>
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
                <div className="flex gap-2 bg-shadow-green-offset">
                    {
                        rememberInfo
                        ?
                        <input type="checkbox" id="rememberMe" className="" checked onChange={() => handleCheckboxChange()}/>
                        :
                        <input type="checkbox" id="rememberMe" className="" onChange={() => handleCheckboxChange()}/>
                    }
                    <label htmlFor="rememberMe" className="bg-shadow-green-offset">Remember Me</label>
                </div>

                {/*Submit button to login*/}
                {
                    isLoading
                    ?
                    <button disabled className="p-2 bg-shadow-green-offset rounded">Loading...</button>
                    :
                        buttonDisabled
                        ?
                        <button type="submit" disabled className="p-2 rounded bg-shadow-green">Login</button>
                        :
                        <button type="submit" className="hover:cursor-pointer hover:bg-shadow p-2 rounded bg-shadow-green">Login</button>
                }

                {/*Redirect for users do not have an account.*/}
                <div className="text-lg flex items-center bg-shadow-green-offset">
                    <p className="bg-shadow-green-offset mr-2">Don't have an account?</p>
                    <h3 className="text-blue hover:text-light-blue hover:cursor-pointer bg-shadow-green-offset" onClick={() => navigate("/register")}>Register Here</h3>
                </div>

                {/*TODO- Create div for oath loggins*/}
            </form>
        </section>
        
    )
}

export default LoginForm; 