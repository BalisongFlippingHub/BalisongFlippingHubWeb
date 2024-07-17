import { useState } from "react"
import UserRegistrationForm from "../components/UserRegistrationForm"
import MakerRegistrationForm from "../components/MakerRegistrationForm"

const RegisterPage = () => {
    const [isMakerAccount, setIsMakerAccount] = useState(false)

    return (
        <section className={
            !isMakerAccount
            ? 
            "flex w-full h-full bg-shadow-green"
            : 
            "flex w-full h-full bg-shadow-red"
        }
        >
            <div className={
                !isMakerAccount
                ?
                "m-auto bg-shadow-green-offset flex flex-col items-center p-6 rounded-lg w-2/6"
                :
                "m-auto bg-shadow-red-offset flex flex-col items-center p-6 rounded-lg w-2/6"
            }>
                <div className="flex items-center flex-col">
                    <h2 className="text-2xl">Account Type</h2>
                <div className="flex">
                    <h2 onClick={() => setIsMakerAccount(false)} className={
                        !isMakerAccount
                        ?
                        "text-xl hover:cursor-pointer p-2 bg-shadow-green rounded mt-2 mb-2 mr-2"
                        :
                        "text-xl hover:cursor-pointer p-2 mt-2 mb-2 mr-2"
                    }>User</h2>
                    <span className="w-1 h-12 mt-2 bg-black"></span>
                    <h2 onClick={() => setIsMakerAccount(true)} className={
                        isMakerAccount
                        ?
                        "text-xl hover:cursor-pointer p-2 mt-2 mb-2 ml-2 bg-shadow-red rounded"
                        :
                        "text-xl bg-shadow-green-offset hover:cursor-pointer p-2 mt-2 mb-2 ml-2"
                    } >Maker</h2>
                </div>
                <span className="h-1/2 border border-black w-80"></span>
                </div>
                {
                !isMakerAccount
                ?
                <UserRegistrationForm />
                :
                <MakerRegistrationForm />
                }
            </div>
        </section>
    )
}

export default RegisterPage;