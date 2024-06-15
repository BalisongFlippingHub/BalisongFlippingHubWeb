import { useState } from "react"
import UserRegistrationForm from "../components/UserRegistrationForm"
import MakerRegistrationForm from "../components/MakerRegistrationForm"

const RegisterPage = () => {
    const [isMakerAccount, setIsMakerAccount] = useState(false)

    return (
        <section className="flex h-screen">
            <div className="m-auto bg-teal-700 flex flex-col items-center p-6 rounded w-2/6">
                <div className="flex items-center flex-col bg-inherit">
                    <h2 className="bg-inherit text-black text-2xl">Account Type</h2>
                <div className="flex">
                    <h2 onClick={() => setIsMakerAccount(false)} className={
                        !isMakerAccount
                        ?
                        "text-xl bg-teal-700 hover:cursor-pointer p-3"
                        :
                        "text-black text-xl bg-teal-700 hover:cursor-pointer p-3"
                    }>User</h2>
                    <h2 className="p-3 bg-teal-700 text-xl text-black"> | </h2>
                    <h2 onClick={() => setIsMakerAccount(true)} className={
                        isMakerAccount
                        ?
                        "text-xl bg-teal-700 hover:cursor-pointer p-3"
                        :
                        "text-black text-xl bg-teal-700 hover:cursor-pointer p-3"
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