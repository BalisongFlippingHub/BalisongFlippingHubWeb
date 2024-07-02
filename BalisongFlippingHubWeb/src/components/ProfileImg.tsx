import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";
import axios from "../api/axios";
import { AxiosHeaderValue } from "axios";
import { Buffer } from "buffer";

const ProfileImg = () => {
    const imgRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [imgData, setImgData] = useState<string>("")
    const [imgType, setImgType] = useState<AxiosHeaderValue | undefined | null>(undefined)

    const { user, setUser, token } = useAuth()

    const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db
        const formData = new FormData();
        formData.append("accountId", JSON.stringify(user?.id))
        formData.append("file", files[0])

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
            setIsLoading(false)
        })
    }

    useEffect(() => {
        // check for img string
        if (user?.profileImg === null || user?.profileImg === "") return;

        const getImg = async () => {
            setIsLoading(true)
            await axios.request({
                url: `/file/${user?.profileImg}`,
                method: 'get',
                responseType: "arraybuffer"
            })
            .then((res) => {
                console.log(res)
                setImgData(Buffer.from(res.data, 'binary').toString('base64'))
                setImgType(res.headers.get("Content-Type"))
            })
            .catch((err) => {
                console.log("Error getting img: ", err)
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
        } 
        getImg()
    }, [user])

    return (
        <div className="w-52 h-52 bg-white rounded-full flex justify-center items-center overflow-hidden absolute translate-y-52">
            <input type="file" ref={imgRef} value={selectedImg} accept=".png,.jpg" className="invisible absolute" onChange={handleImgChange}/>
            {
                !isLoading
                ?
                    !user?.profileImg || user?.profileImg === ""
                    ?
                    <div className="bg-inherit hover:cursor-pointer" onClick={() => imgRef.current?.click()}>
                        <h3 className="bg-inherit text-black text-center">Add Profile Img</h3>
                    </div>
                    :
                    <div>
                        {
                            imgType !== "image/png"
                            ?
                            <img src={`data:image/png;base64,${imgData}`} className="" />
                            :
                            <img src={`data:image/jpeg;base64,${imgData}`} className="" />
                        }
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