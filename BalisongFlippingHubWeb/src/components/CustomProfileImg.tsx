import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Profile } from "../modals/User";
import axios from "../api/axios";
import { AxiosHeaderValue } from "axios";
import { Buffer } from "buffer";

const CustomProfileImg = () => {
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
                /*@ts-ignore*/
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

    if (fullScreen) {
        return (
            <div className="top-0 right-0 left-0 bottom-0 bg-black z-10 fixed hover:cursor-pointer flex justify-center" onClick={() => setFullScreen(false)}>
                <div className="w-5/6 h-full">
                {
                    imgType !== "image/png"
                    ?
                    <img src={`data:image/png;base64,${imgData}`} className="w-full h-full object-contain" />
                    :
                    <img src={`data:image/jpeg;base64,${imgData}`} className="w-full h-full object-contain" />
                }
                </div>
                
                <input type="file" ref={imgRef} value={selectedImg} accept=".png,.jpg" className="invisible absolute" onChange={handleImgChange} />
            </div>
        )
    }
    else {
        return (
            <div className="lg:w-52 lg:h-52 md:w-48 md:h-48 sm:w-40 sm:h-40 xsm:h-36 xsm:w-36 bg-white rounded-full flex justify-center items-center overflow-hidden absolute bottom-0 lg:translate-y-[102px] md:translate-y-[96px] sm:translate-y-[82px] xsm:translate-y-[72px]">
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
                        <div className="relative w-full h-full hover:cursor-pointer hover:blur" onClick={() => setFullScreen(true)}>
                            {
                                imgType !== "image/png"
                                ?
                                <img src={`data:image/png;base64,${imgData}`} className="w-full h-full object-cover" />
                                :
                                <img src={`data:image/jpeg;base64,${imgData}`} className="w-full h-full object-cover" />
                            }
                        </div>
                    :
                    <div>
                        <h3>Loading...</h3>
                    </div>
                }
            </div>
        )
    }
}

export default CustomProfileImg; 