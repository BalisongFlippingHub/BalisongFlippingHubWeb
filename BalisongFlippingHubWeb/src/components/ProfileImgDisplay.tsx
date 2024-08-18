import { useEffect, useState } from "react"
import axios from "../api/axios"
import { Buffer } from "buffer"

interface params {
    imgStr: string | null | undefined
}

const ProfileImgDisplay = ({ imgStr }: params) => {
    const [imgBinaryData, setImgBinaryData] = useState("")
    const [imgType, setImgType] = useState<string | null>("") 

    useEffect(() => {
        if (imgStr) {
            const getImg = async () => {
                await axios.request({
                    url: `/file/${imgStr}`,
                    method: 'get',
                    responseType: "arraybuffer"
                })
                .then((res) => {
                    console.log("profile img found", res)
                    setImgBinaryData(Buffer.from(res.data, 'binary').toString('base64'))
                    /*@ts-ignore*/
                    setImgType(res.headers.get("Content-Type"))
                })
                .catch((err) => {
                    console.log("Error getting img: ", err)
                })
                .finally(() => {
                    
                })
            } 
            getImg()
        }
    }, [])
    
    switch(imgType) {
        case "image/png":
            return (
                <img src={`data:image/png;base64,${imgBinaryData}`} className="object-cover" />
            )
        case "image/jpeg":
            return (
                <img src={`data:image/jpeg;base64,${imgBinaryData}`} className="object-cover" />
            )
        default: 
            return (
                <div className="w-full h-full bg-white">

                </div>
            )
    }
}

export default ProfileImgDisplay