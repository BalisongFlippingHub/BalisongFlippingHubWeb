import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";
import axios from "../api/axios";

const ProfileImg = () => {
    const imgRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { user, setUser, token } = useAuth()

    const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db
        const formData = new FormData();
        formData.append("accountId", JSON.stringify(user?.uuid))
        formData.append("file", files[0])

        setUser({
            ...user,
            profileImg: files[0]
        } as Profile) 
        setIsLoading(true)

        await axios.request({
            url: "/accounts/me/update-profile-img",
            method: 'post',
            data: formData, 
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data', 
              }
        })
        .then((res) => {
            console.log("update profile img response: ", res)
            // upon success update user in auth 

        })
        .catch((err) => {
            console.log("Update profile img error: ", err)
            setUser({
                ...user,
                profileImg: null
            } as Profile) 
        })
        .finally(() => {
            // clear out img input
            console.log("updating img")
            setSelectedImg("")
            setIsLoading(false)
        })
    }

    return (
        <div className="w-32 h-32 bg-white rounded-full flex justify-center items-center overflow-hidden">
            <input type="file" ref={imgRef} value={selectedImg} accept=".png,.jpg" className="invisible absolute" onChange={handleImgChange}/>
            {
                !isLoading
                ?
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
                :
                <div>
                    <h3>Loading...</h3>
                </div>
            }
        </div>
    )
}

export default ProfileImg; 