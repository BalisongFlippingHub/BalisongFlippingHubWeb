import { useRef, useState } from "react"

const MakerRegistrationForm = () => {

    const emailRef = useRef<HTMLInputElement>(null)
    const companyNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const [email, setEmail] = useState("")
    const [companyName, setCompnayName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (confirmedPassword !== password) {
            return;
        }
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