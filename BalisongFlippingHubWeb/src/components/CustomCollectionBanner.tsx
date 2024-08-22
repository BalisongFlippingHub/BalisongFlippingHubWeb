import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Buffer } from "buffer";

interface params {
    imageId?: string | null
}


const CustomCollectionBanner = ({ imageId }: params) => {
    const imgRef = useRef<HTMLInputElement>(null)
    
    const [selectedImg, setSelectedImg] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [image, setImage] = useState<ImageBufferData | null>(null)

    const [enableInput, setEnableInput] = useState(true)

    const { user, token } = useAuth()

    const getImageData = async(newImageId?: string) => {

        if (newImageId) {
            setIsLoading(true)
            await axios.request({
                url: `/file/${newImageId}`,
                method: 'get',
                responseType: "arraybuffer"
            })
            .then((res) => {
                setImage({
                    data: Buffer.from(res.data, 'binary').toString('base64'),
                    /*@ts-ignore*/
                    type: res.headers.get("Content-Type")
                })
                setEnableInput(false)
            })
            .catch((err) => {
                console.log("Error getting img: ", err)
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
        else {
            setIsLoading(true)
            await axios.request({
                url: `/file/${imageId}`,
                method: 'get',
                responseType: "arraybuffer"
            })
            .then((res) => {
                setImage({
                    data: Buffer.from(res.data, 'binary').toString('base64'),
                    /*@ts-ignore*/
                    type: res.headers.get("Content-Type")
                })
                setEnableInput(false)
            })
            .catch((err) => {
                console.log("Error getting img: ", err)
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    }

    const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        // save new img on db
        const formData = new FormData();

        formData.append("collectionId", user?.collectionId!)
        formData.append("file", files[0])

        console.log(token, user?.collectionId)
        setIsLoading(true)

        await axios.request({
            url: "/collection/me/update-banner-image",
            method: 'post',
            data: formData, 
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data', 
              }
        })
        .then((res) => {
            console.log("update collection img response: ", res)
            // upon success update user in auth 
            getImageData(res.data)
            setEnableInput(false)
        })
        .catch((err) => {
            console.log("Update Collection img error: ", err)
            setIsError(true)
        })
        .finally(() => {
            // clear out img input
            setSelectedImg("")
            setIsLoading(false)
        })
    }

    useEffect(() => {

        if (imageId) {
            getImageData()
        }
    }, [])

    return (
        <div className="w-full h-96 flex justify-center items-center bg-shadow-green-offset text-3xl font-bold">
            {
                enableInput
                ?
                <input type="file" ref={imgRef} accept=".png,.jpg" className="invisible absolute" value={selectedImg} onChange={handleImgChange}/>
                :
                <input type="file" ref={imgRef} accept=".png,.jpg" disabled className="invisible absolute" value={selectedImg} onChange={handleImgChange}/>
            }
        
            {
                isLoading
                ?
                <div>
                    {/*Loading Component*/}
                    Loading...
                </div>
                :
                    isError
                    ?
                    <div>
                        {/*Error Component*/}
                        Error...
                    </div>
                    :
                        image !== null 
                        ?
                        <div className="w-full h-full relative">
                            {/*Display Image*/}
                            <img 
                            className="w-full h-full object-cover"
                            src={
                                image.type !== "image/png"
                                ?
                                `data:image/png;base64,${image.data}`
                                :
                                `data:image/jpeg;base64,${image.data}`
                            }
                             />

                             <h3 className="absolute top-1/2 left-1/2 text-7xl text-black font-bold">Collection</h3>
                        </div>
                        :
                        <div className="w-4/5 h-2/3 border border-dashed flex justify-center items-center">
                            {/*Enable Setting Banner Image*/}
                            <button type="button" onClick={() => imgRef.current?.click()}>Update Cover Photo</button>
                        </div>
            }
        </div>
    )
}

export default CustomCollectionBanner;