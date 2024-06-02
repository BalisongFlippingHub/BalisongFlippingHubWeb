import { useState } from "react"
import UserRegistrationForm from "../components/UserRegistrationForm"
import MakerRegistrationForm from "../components/MakerRegistrationForm"

const RegisterPage = () => {
    const [isMakerAccount, setIsMakerAccount] = useState(false)

    return (
        <div className="m-auto bg-teal-700 flex flex-col items-center">
            <div className="flex items-center flex-col">
                <h2>Account Type</h2>
                <div className="flex">
                    <h2 onClick={() => setIsMakerAccount(false)} className={
                        !isMakerAccount
                        ?
                        "text-black hover:cursor-pointer p-3"
                        :
                        "text-white hover:cursor-pointer p-3"
                    }>User</h2>
                    <h2 className="p-3"> | </h2>
                    <h2 onClick={() => setIsMakerAccount(true)} className={
                        isMakerAccount
                        ?
                        "text-black hover:cursor-pointer p-3"
                        :
                        "text-white hover:cursor-pointer p-3"
                    } >Maker</h2>
                </div>
                <h1>-------------------------</h1>
            </div>
            {
                !isMakerAccount
                ?
                <UserRegistrationForm />
                :
                <MakerRegistrationForm />
            }
        </div>
    )
}

export default RegisterPage;