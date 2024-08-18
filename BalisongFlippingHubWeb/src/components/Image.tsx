import { useEffect, useState } from "react"
import axios from "../api/axios"
import { Buffer } from "buffer"

interface params {
    imageId: string | undefined,
    contain?: boolean
}

const Image = ({ imageId, contain }: params) => {
    const [image, setImage] = useState<ImageBufferData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getImg = async () => {
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
                } as ImageBufferData)
            })
            .catch((err) => {
                console.log("Error getting img: ", err)
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
        } 

        if (imageId) {
            getImg()    
        }
        else {
            setIsError(true)
        }
        
    }, []) 

    if (isLoading) {
        return (
            <div className="w-full h-full">
                loading...
            </div>
        )
    }
    else {
        if (isError) {
            return (
                <div className="w-full h-full">
                    ERROR
                </div>  
            )
        }

       return (
            <img 
            className={
                contain
                ?
                "w-full h-full object-contain"
                :
                "w-full h-full object-cover"
            } 
            
            src={
                image?.type !== "image/png"
                ?
                `data:image/png;base64,${image?.data}`
                :
                `data:image/jpeg;base64,${image?.data}`
            }
            />
       )
    }
}

export default Image; 