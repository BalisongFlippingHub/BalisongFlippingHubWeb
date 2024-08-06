import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";
import axios from "../api/axios";
import { AxiosHeaderValue } from "axios";
import { Buffer } from "buffer";

const CustomProfileBanner = () => {
    const imgRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [imgData, setImgData] = useState<string>("")
    const [imgType, setImgType] = useState<AxiosHeaderValue | null | undefined>(null)

    const [fullScreen, setFullScreen] = useState(false)

    const { user, setUser, token } = useAuth()

    const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db
        const formData = new FormData();
        formData.append("accountId", user?.id!)
        formData.append("file", files[0])

        setIsLoading(true)

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
                bannerImg: res.data
            } as Profile)
        })
        .catch((err) => {
            console.log("Update profile img error: ", err)
            setUser({
                ...user,
                bannerImg: null
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
        if (user?.bannerImg === null || user?.bannerImg === "") return;

        const getImg = async () => {
            setIsLoading(true)
            await axios.request({
                url: `/file/${user?.bannerImg}`,
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
        <div className="w-full h-full flex justify-center items-center bg-shadow-green-offset text-3xl font-bold z-1">
            <input type="file" ref={imgRef} accept=".png,.jpg" className="invisible absolute" value={selectedImg} onChange={handleImgChange}/>
        {
            !user?.bannerImg
            ?
            <div onClick={() => imgRef.current?.click()} className="hover:cursor-pointer w-1/2 h-1/2 border border-dashed rounded flex justify-center items-center">
                <h3 className="bg-inherit">Click to add Img</h3>
            </div>
            :
            <div className="w-full h-full relative">
                {
                    imgType !== "image/png"
                    ?
                    <img src={`data:image/png;base64,${imgData}`} className="w-full h-full object-cover" />
                    :
                    <img src={`data:image/jpeg;base64,${imgData}`} className="w-full h-full object-cover" />
                }
                
            </div>
        }
        </div>
    )
}

export default CustomProfileBanner;