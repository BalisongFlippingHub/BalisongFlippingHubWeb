import { useEffect, useState } from "react"
import TimeoutBar from "../TimeoutBar"
import { useNavigate } from "react-router-dom"


const SuccessfulEmailVerificationComponent = () => {
    const [timer, setTimer] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prev) => prev += 1)
        }, 300)

        const timeoutId = setTimeout(() => {
            clearInterval(intervalId)
            navigate("/login")
        }, 30000)

        return (() => {
            console.log("clearing to login")
            clearInterval(intervalId)
            clearTimeout(timeoutId)
            navigate("/login")
        })
    }, [])

    return (
        <div className="relative w-1/2 flex flex-col items-center justify-center gap-10 bg-dark-primary border-4 border-black text-2xl text-white p-10">
            <h1 className="text-4xl font-bold">Success!</h1>
            
            <p className="text-center">Your email has been verified! You are now verified to login! Happy flipping!</p>

            <div>
                <button className="pt-2 pb-2 pl-4 pr-4 bg-blue-primary rounded-lg hover:scale-110 font-bold transition-transform ease-linear duration-300" type="button" onClick={() => navigate('/login')}><h3>To Login</h3></button>
            </div>

            <div className="absolute bottom-0 w-full h-1">
                <TimeoutBar percentage={timer} />
            </div>
        </div>
    )
}

export default SuccessfulEmailVerificationComponent