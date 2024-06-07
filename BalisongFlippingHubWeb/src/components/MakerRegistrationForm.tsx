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
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [isError, setIsError] = useState(false)

    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()
    
    const handleSubmit = (e: any) => {
        e.preventDefault()

        console.log("handling submit to create maker account")
        confirmedPassword.trim()
        email.trim()
        password.trim()
        companyName.trim()

        if (confirmedPassword === "" || email === "" || password === "" || companyName === "") {
            console.log("not all fields filled in.")
            return; 
        }

        if (confirmedPassword !== password) {
            console.log("Password mismatch")
            return; 
        }

        setLoadingRequest(true)
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
            console.log("Creating account error: ", err)
        })
        .finally(() => {
            setLoadingRequest(false)
        })
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="m-auto">Maker</h1>

            <div className="flex flex-col">
                <label>Email</label>
                <input 
                    type="email"
                    required
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="text-black"
                />
            </div>
            <div className="flex flex-col">
                <label>Company Name</label>
                <input 
                    type="text"
                    required
                    ref={companyNameRef}
                    onChange={(e) => setCompnayName(e.target.value)}
                    value={companyName}
                    className="text-black"
                />
            </div>
            <div className="flex flex-col">
                <label>Password</label>
                <input 
                    type="password"
                    required
                    ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="text-black"
                />
            </div>
            <div className="flex flex-col">
                <label>Confirm Password</label>
                <input 
                    type="password"
                    required
                    ref={confirmPasswordRef}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    value={confirmedPassword}
                    className="text-black"
                />
            </div>

            <button type="submit" className="">Create Account</button>
        </form>
    )
}

export default MakerRegistrationForm;