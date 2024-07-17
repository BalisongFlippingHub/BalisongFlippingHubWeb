import { useRef, useState } from "react"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const MakerRegistrationForm = () => {
    // form refs
    const emailRef = useRef<HTMLInputElement>(null)
    const companyNameRef = useRef<HTMLInputElement>(null)
    const companyCreationDateRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    // state for input field values
    const [email, setEmail] = useState("")
    const [companyName, setCompnayName] = useState("")
    const [compnayCreationDate, setCompnayCreationDate] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    // loading state
    const [isLoading, setIsLoading] = useState(false)

    // error handling
    const [errMsg, setErrMsg] = useState("")
    const [isError, setIsError] = useState(false)

    // button disabling and enabling
    const [buttonDisabled, setButtonDisabled] = useState(false)

    // contexts
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
                        navigate("community")
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
        <form className="flex flex-col text-lg w-full" onSubmit={handleSubmit}>
            {
                isError
                ?
                <h3>{errMsg}</h3>
                :
                <h3></h3>
            }

            {/*Email Input Field*/}
            <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input 
                    type="email"
                    required
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="border border-black rounded-lg bg-inherit p-2 mt-2"
                />
            </div>

            {/*Company Name Input Field*/}
            <div className="flex flex-col">
                <label className="font-semibold">Company Name</label>
                <input 
                    type="text"
                    required
                    ref={companyNameRef}
                    onChange={(e) => setCompnayName(e.target.value)}
                    value={companyName}
                    className="border border-black rounded-lg bg-inherit mt-2 p-2"
                />
            </div>

            {/*Company Age Input Field*/}
            <div className="flex flex-col">
                <label className="font-semibold">Company Creation Date</label>
                <input 
                    type="date"
                    required
                    ref={companyCreationDateRef}
                    onChange={(e) => setCompnayCreationDate(e.target.value)}
                    value={compnayCreationDate}
                    className="border rounded-lg border-black bg-inherit mt-2 p-2"
                />
            </div>

            {/*Password Input Field*/}
            <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <input 
                    type="password"
                    required
                    ref={passwordRef}
                    onChange={(e) => handlePasswordChange(e)}
                    value={password}
                    className="border rounded-lg border-black bg-inherit mt-2 p-2"
                />
            </div>

            {/*Confirm Password Input Field*/}
            <div className="flex flex-col">
                <label className="font-semibold">Confirm Password</label>
                <input 
                    type="password"
                    required
                    ref={confirmPasswordRef}
                    onChange={(e) => handleConfirmedPasswordChange(e)}
                    value={confirmedPassword}
                    className="border rounded-lg border-black bg-inherit mt-2 p-2"
                />
            </div>

            {/*Create Account Button Submit*/}
            {
                isLoading
                ?
                <button disabled className="p-2 bg-shadow-red mt-4 rounded">Loading...</button>
                :
                    buttonDisabled
                    ?
                    <button type="submit" disabled className="p-2 bg-shadow-red mt-4 rounded">Create Account</button>
                    :
                    <button type="submit" className="p-2 bg-shadow-red mt-4 rounded">Create Account</button>
            }

            {/*Link to login*/}
            <div className="flex mt-2">
                <h4>Already have an account?</h4>
                <button className="ml-2 text-blue hover:text-light-blue" onClick={() => navigate("/login")}>Login here</button>
            </div>
        </form>
    )
}

export default MakerRegistrationForm;