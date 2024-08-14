import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const badDisplayNames = ["fuck", "bitch", "cunt", "shit", "crap", "dick", "cock", "pussy", "twat", "penis", "vagina", "testicles", "cum", "sperm", "spunk", "orgasm", "cunnilingus", "analingus", "sex", "coitus", "anal"]

const UserRegistrationForm = () => {
    // form refs
    const emailRef = useRef<HTMLInputElement>(null)
    const displayNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    // input field value states
    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    // loading state
    const [isLoading, setIsLoading] = useState(false)

    // error handling state
    const [errMsg, setErrMsg] = useState("")
    const [isError, setIsError] = useState(false)

    // state to handle button enabling and disabling
    const [buttonDisabled, setButtonDisabled] = useState(false)

    // contexts
    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()

    const handleDisplayNameChange = (e: any) => {
        setDisplayName(e.target.value)

        if (buttonDisabled) {
            setButtonDisabled(false)
        }

        if (isError) {
            setIsError(false)
        }
    }
    
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)

        if (buttonDisabled) {
            setButtonDisabled(false)
        }

        if (isError) {
            setIsError(false)
        }
    }

    const handleConfirmedPasswordChange = (e: any) => {
        setConfirmedPassword(e.target.value)

        if (buttonDisabled) {
            setButtonDisabled(false)
        }

        if (isError) {
            setIsError(false)
        }
    }

    const passwordCheck = () => {
        confirmedPassword.trim()
        password.trim()

        {/*Check for passwords match*/}
        if (password != confirmedPassword) {
            setErrMsg("*Passwords do not match.*")
            setIsError(true)
            passwordRef.current?.focus();
            setButtonDisabled(true)
            return false; 
        }
        
        return true;
    }

    const displayNameCheck = () => {
        if (displayName === "") return true

        displayName.trim()
        const holderVal: string = displayName.toLocaleLowerCase()

        for (var i = 0; i < badDisplayNames.length; i++) {
            if (holderVal.includes(badDisplayNames[i])) {
                setErrMsg("*Inappropriate display name.*")
                setIsError(true)
                displayNameRef.current?.focus()
                setButtonDisabled(true)
                return false
            }
        }

        return true
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        {/*Validate Password*/}
        if (!passwordCheck()) return 

        {/*Check display name*/}
        if (!displayNameCheck()) return

        {/*Prepare Package Data*/}
        displayName.trim()
        password.trim()
        email.trim()

        {/*Begin Registration with back end*/}
        setIsLoading(true)
        axios.request({
            url: "/auth/register",
            method: 'post',
            data: {
                email: email,
                accountName: displayName,
                password: password,
            }
        })
        .then((res) => {
            {/*On Successful Creation*/}
            console.log("Creating Account Res: ", res)
            if (res?.status === 200) {
                {/*Login Directly*/}
                axios.request({
                    url: "/auth/login",
                    method: "post",
                    data: {
                        email: email,
                        password: password
                    }
                })
                .then((res) => {
                    {/*Upon Successful Login*/}
                    console.log("Logging user in response:", res)
                    if (res.status === 200) {
                        setToken(res.data.token)
                        setUser(res.data.account)
                        navigate("/community")
                    }
                })
                .catch((err) => {
                    {/*Failed to automatically login user*/}
                    console.log("Loggin user in error: ", err)
                    navigate("/login")
                })
            }
        })
        .catch((err) => {
            {/*Error found in registering new user*/}
            console.log(err)
            setErrMsg("*Error registering new account.*")
            setIsError(true)
            emailRef.current?.focus()
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="w-3/4 flex xsm:flex-col md:flex-row">

            {/*Create Account Caption*/}
            <section className="md:w-1/2 xsm:w-full bg-shadow xsm:h-20 md:h-auto flex items-center justify-center">
                <h3 className="text-xl font-bold">Start your flipping journey today.</h3>
            </section>

            {/*Registration Form*/}
            <form className="flex flex-col gap-3 text-lg xsm:w-full md:w-1/2 bg-shadow-green-offset p-12" onSubmit={handleSubmit}>
                {/*Form Title*/}
                <div className="flex justify-center items-center flex flex-col">
                    <h1 className="text-4xl">Register Here</h1>
                    {
                        isError
                        ?
                            errMsg === "*Error registering new account.*"
                            ?
                            <p className="text-red">{errMsg}</p>
                            :
                            <p className="invisible">Fill</p>
                        :
                        <p className="invisible">Fill</p>
                    }
                </div>

                {/*Email Input Field*/}
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <label className="font-semibold">*Email</label>
                        {
                            isError
                            ?
                                errMsg === "*Email already registered with account.*"
                                ?
                                <p className="text-red">{errMsg}</p>
                                :
                                <></>
                            :
                            <></>
                        }
                    </div>

                    <input 
                        type="email"
                        required
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="bg-inherit border border-black rounded-lg p-2"
                    />
                </div>

                {/*Display Name Input Field*/}
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <label className="font-semibold">Display Name</label>
                        {
                            isError
                            ?
                                errMsg === "*Inappropriate display name.*"
                                ?
                                <p className="text-red">{errMsg}</p>
                                :
                                <></>
                            :
                            <></>
                        }
                    </div>
                    
                    <input 
                        type="text"
                        ref={displayNameRef}
                        onChange={(e) => handleDisplayNameChange(e)}
                        value={displayName}
                        className="border border-black rounded-lg bg-inherit p-2"
                    />
                </div>

                {/*Password Input Field*/}
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <label className="font-semibold">*Password</label>
                        {
                            isError
                            ?
                                errMsg === "*Passwords do not match.*"
                                ?
                                <p className="text-red">{errMsg}</p>
                                :
                                <></>
                            :
                            <></>
                        }
                    </div>
                    
                    <input 
                        type="password"
                        required
                        ref={passwordRef}
                        onChange={(e) => handlePasswordChange(e)}
                        value={password}
                        className="border rounded-lg border-black bg-inherit p-2"
                    />
                </div>

                {/*Confirm Password Input Field*/}
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <label className="font-semibold">*Confirm Password</label>
                        {
                            isError
                            ?
                                errMsg === "*Passwords do not match.*"
                                ?
                                <p className="text-red">{errMsg}</p>
                                :
                                <></>
                            :
                            <></>
                        }
                    </div>
                    
                    <input 
                        type="password"
                        required
                        ref={confirmPasswordRef}
                        onChange={(e) => handleConfirmedPasswordChange(e)}
                        value={confirmedPassword}
                        className="border rounded-lg border-black bg-inherit p-2"
                    />
                </div>

                {/*Create Account Button*/}
                {
                    isLoading
                    ?
                    <button disabled className="p-3 bg-shadow-green rounded text-xl">Loading...</button>
                    :
                        buttonDisabled
                        ?
                        <button type="submit" disabled className="p-3 bg-shadow-green rounded text-xl">Create Account</button>
                        :
                        <button type="submit" className="p-3 bg-shadow-green rounded text-xl hover:bg-shadow">Create Account</button>
                }

                {/*Link to login*/}
                <div className="flex sm:text-lg xsm:text-sm">
                    <h4>Already have an account?</h4>
                    <button className="ml-2 text-blue hover:text-light-blue" onClick={() => navigate("/login")}>Login here</button>
                </div>

                {/*TODO- Create div to handle oath account creation.*/}
            </form>
        </div>
    )
}

export default UserRegistrationForm;