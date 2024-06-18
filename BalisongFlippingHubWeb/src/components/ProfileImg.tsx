import { ChangeEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";

const ProfileImg = () => {
    const imgRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")
    
    const { user, setUser} = useAuth()

    const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db

        // upon success update user in auth 
        setUser({
            ...user,
            profileImg: files[0]
        } as Profile)

        // clear out img input
        setSelectedImg("")
    }

    return (
        <div className="w-32 h-32 bg-white rounded-full flex justify-center items-center overflow-hidden">
            <input type="file" ref={imgRef} value={selectedImg} accept=".png,.jpg" className="invisible absolute" onChange={handleImgChange}/>
            {
                !user?.profileImg
                ?
                <div className="bg-inherit hover:cursor-pointer" onClick={() => imgRef.current?.click()}>
                    <h3 className="bg-inherit text-black text-center">Add Profile Img</h3>
                </div>
                :
                <div>
                    <img src={URL.createObjectURL(user?.profileImg)} className="" />
                    <button type="button" onClick={() => imgRef.current?.click()} className="bg-black absolute w-6 h-6 rounded-full translate-x-24 -translate-y-6"></button>
                </div>
            }
        </div>
    )
}

export default ProfileImg; 