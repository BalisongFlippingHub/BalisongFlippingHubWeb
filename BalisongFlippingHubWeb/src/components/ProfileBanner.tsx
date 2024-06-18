import { ChangeEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";

const ProfileBanner = () => {
    const bannerRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")

    const { user, setUser } = useAuth()

    const handleBannerImgChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db

        // upon success update user in auth 
        setUser({
            ...user,
            bannerImg: files[0]
        } as Profile)

        // clear out img input
        setSelectedImg("")
    }

    return (
        <div className="w-full flex justify-center items-center bg-teal-500 h-52 text-3xl font-bold">
            <input type="file" ref={bannerRef} accept=".png,.jpg" className="invisible absolute" value={selectedImg} onChange={handleBannerImgChange}/>
        {
            !user?.bannerImg
            ?
            <div onClick={() => bannerRef.current?.click()} className="hover:cursor-pointer w-1/2 h-1/2 border border-dashed rounded flex justify-center items-center bg-inherit">
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