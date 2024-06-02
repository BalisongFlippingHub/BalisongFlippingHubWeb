import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setErrMsg("*Email or Password was invalid")
        setError(true)
    }

    return (
        <form className="m-auto p-6 flex flex-col bg-teal-700 rounded" onSubmit={handleSubmit}>
            <h2 className="text-black m-auto mb-2">Login</h2>
            {
                error
                ?
                <p className="text-red-400">{errMsg}</p>
                :
                <p className="text-teal-700">Fill</p>
            }
            <div className="flex flex-col">
                <label htmlFor="emailInput" className="text-black">Email</label>
                <input
                    type="email"
                    id="emailInput"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    value={email}
                    required
                    className="text-black p-1 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="passwordInput" className="text-black">Password</label>
                <input
                    type="password"
                    id="passwordInput"
                    ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="text-black p-1 rounded"
                />
            </div>
            <div>
                <input type="checkbox" id="rememberMe" className="mr-2"/>
                <label htmlFor="rememberMe" className="text-black">Remember Me</label>
            </div>
            <button type="submit" className="hover:cursor-pointer p-2 bg-slate-500 rounded hover:bg-slate-300 mt-3">Login</button>
            <h3 className="text-blue-500 hover:cursor-pointer mt-2" onClick={() => navigate("/register")}>Register Here</h3>
        </form>
    )
}

export default LoginForm; 