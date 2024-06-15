
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
                navigate("/home")
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

    return (
        <section className="flex h-screen">
            <form className="m-auto p-6 flex flex-col bg-teal-700 rounded w-2/6 text-xl" onSubmit={handleSubmit}>
                <h2 className="text-black m-auto text-3xl font-bold bg-inherit">Login</h2>
                {
                    error
                    ?
                    <p className="text-red-400">{errMsg}</p>
                    :
                    <p className="text-teal-700 bg-inherit">Fill</p>
                }
                <div className="flex flex-col mb-2 bg-teal-700">
                    <label htmlFor="emailInput" className="text-black mb-2 bg-teal-700 font-semibold">Email</label>
                    <input
                        type="email"
                        id="emailInput"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => handleOnChangeEmail(e)}
                        placeholder="example@email.com"
                        value={email}
                        required
                        className="text-black p-2 rounded border border-black bg-teal-700"
                    />
                </div>
                <div className="flex flex-col bg-inherit">
                    <label htmlFor="passwordInput" className="text-black mb-1 bg-teal-700 font-semibold">Password</label>
                    <input
                        type="password"
                        id="passwordInput"
                        ref={passwordRef}
                        onChange={(e) => handleOnChangePassword(e)}
                        value={password}
                        required
                        className="text-black p-2 rounded border border-black bg-teal-700"
                    />
                </div>
                <div className="mt-2 bg-inherit">
                    <input type="checkbox" id="rememberMe" className="mr-2"/>
                    <label htmlFor="rememberMe" className="text-black bg-teal-700">Remember Me</label>
                </div>
                {
                    isLoading
                    ?
                    <button disabled className="p-2 bg-slate-500 rounded mt-3">Loading...</button>
                    :
                        buttonDisabled
                        ?
                        <button type="submit" disabled className="p-2 bg-slate-500 rounded mt-3">Login</button>
                        :
                        <button type="submit" className="hover:cursor-pointer p-2 bg-slate-500 rounded hover:bg-slate-300 mt-3">Login</button>
                }
                <h3 className="text-blue-300 hover:text-blue-200 hover:cursor-pointer mt-2 bg-inherit" onClick={() => navigate("/register")}>Register Here</h3>
            </form>
        </section>
        
    )
}

export default LoginForm; 