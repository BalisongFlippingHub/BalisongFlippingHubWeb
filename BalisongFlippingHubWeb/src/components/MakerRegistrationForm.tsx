import { useRef, useState } from "react"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const MakerRegistrationForm = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const companyNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const [email, setEmail] = useState("")
    const [companyName, setCompnayName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [isError, setIsError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()
    
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)

        if (buttonDisabled) {
            setButtonDisabled(false)
        }
    }

    const handleConfirmedPasswordChange = (e: any) => {
        setConfirmedPassword(e.target.value)

        if (buttonDisabled) {
            setButtonDisabled(false)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        console.log("handling submit to create maker account")
        confirmedPassword.trim()
        email.trim()
        password.trim()
        companyName.trim()

        if (confirmedPassword !== password) {
            setErrMsg("*Passwords do not match.")
            setIsError(true)
            passwordRef.current?.focus();
            setButtonDisabled(true)
            return; 
        }

        setIsLoading(true)
        axios.request({
            url: "/auth/register",
            method: 'post',
            data: {
                email: email,
                accountName: companyName,
                password: password,
                role: 'MAKER'
            }
        })
        .then((res) => {
            console.log("Creating Account Res: ", res)
            if (res?.status === 200) {
                axios.request({
                    url: "/auth/login",
                    method: "post",
                    data: {
                        email: email,
                        password: password
                    }
                })
                .then((res) => {
                    console.log("Logging user in response:", res)
                    if (res.status === 200) {
                        setToken(res.data.token)
                        setUser(res.data.account)
                        navigate("/")
                    }
                })
                .catch((err) => {
                    console.log("Loggin user in error: ", err)
                    navigate("/login")
                })
            }
        })
        .catch((err) => {
            console.log(err)
            setErrMsg("*Error in creating user.")
            setIsError(true)
            emailRef.current?.focus()
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <form className="flex flex-col bg-inherit text-lg w-full" onSubmit={handleSubmit}>
            <h1 className="m-auto bg-inherit text-xl font-bold text-black">Maker</h1>
            {
                isError
                ?
                <h3>{errMsg}</h3>
                :
                <h3></h3>
            }
            <div className="flex flex-col bg-inherit">
                <label className="bg-teal-700 text-black font-semibold">Email</label>
                <input 
                    type="email"
                    required
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="text-black bg-teal-700 border border-black rounded p-2 mt-2"
                />
            </div>
            <div className="flex flex-col bg-inherit">
                <label className="bg-inherit text-black font-semibold">Company Name</label>
                <input 
                    type="text"
                    required
                    ref={companyNameRef}
                    onChange={(e) => setCompnayName(e.target.value)}
                    value={companyName}
                    className="text-black border border-black rounded bg-inherit mt-2 p-2"
                />
            </div>
            <div className="flex flex-col bg-inherit">
                <label className="bg-inherit text-black font-semibold">Password</label>
                <input 
                    type="password"
                    required
                    ref={passwordRef}
                    onChange={(e) => handlePasswordChange(e)}
                    value={password}
                    className="text-black border rounded border-black bg-inherit mt-2 p-2"
                />
            </div>
            <div className="flex flex-col bg-inherit">
                <label className="bg-inherit text-black font-semibold">Confirm Password</label>
                <input 
                    type="password"
                    required
                    ref={confirmPasswordRef}
                    onChange={(e) => handleConfirmedPasswordChange(e)}
                    value={confirmedPassword}
                    className="text-black border rounded border-black bg-inherit mt-2 p-2"
                />
            </div>

            {
                isLoading
                ?
                <button disabled className="p-2 bg-slate-500 mt-4 rounded">Loading...</button>
                :
                    buttonDisabled
                    ?
                    <button type="submit" disabled className="p-2 bg-slate-500 mt-4 rounded">Create Account</button>
                    :
                    <button type="submit" className="p-2 bg-slate-500 mt-4 rounded hover:bg-slate-200">Create Account</button>
            }
        </form>
    )
}

export default MakerRegistrationForm;