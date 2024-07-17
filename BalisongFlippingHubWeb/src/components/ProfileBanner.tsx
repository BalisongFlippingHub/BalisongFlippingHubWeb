import { ChangeEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";
import axios from "../api/axios";

const ProfileBanner = () => {
    const bannerRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")

    const { user, setUser, token } = useAuth()

    const handleBannerImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db
        const formData = new FormData();
        formData.append("accountId", JSON.stringify(user?.id))
        formData.append("file", files[0])

        await axios.request({
            url: "/accounts/me/update-banner-img",
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
            setUser({
                ...user,
                profileImg: res.data
            } as Profile)
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
            setSelectedImg("")
        })
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-shadow-green-offset text-3xl font-bold">
            <input type="file" ref={bannerRef} accept=".png,.jpg" className="invisible absolute" value={selectedImg} onChange={handleBannerImgChange}/>
        {
            !user?.bannerImg
            ?
            <div onClick={() => bannerRef.current?.click()} className="hover:cursor-pointer w-1/2 h-1/2 border border-dashed rounded flex justify-center items-center">
                <h3 className="bg-inherit">Click to add Img</h3>
            </div>
            :
            <div className="w-full text-lg">
                <img src={URL.createObjectURL(user?.bannerImg)} className="object-cover w-full h-52" />
                <button type="button" onClick={() => bannerRef.current?.click()} className="absolute right-5 -translate-y-20 z-10 bg-black p-4 rounded">Change Banner</button>
            </div>
        }
        </div>
    )
}

export default ProfileBanner;