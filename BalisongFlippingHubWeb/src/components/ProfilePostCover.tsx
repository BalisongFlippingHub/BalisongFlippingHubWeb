import { useEffect, useState } from "react";
import { PostCover } from "../modals/Post";
import axios from "../api/axios";
import { Buffer } from "buffer";


interface params {
    post: PostCover
}

const ProfilePostCover = ({ post }: params) => {
    const [coverImg, setCoverImg] = useState<ImageBufferData | null>(null)

    useEffect(() => {
        if (post.coverFile !== "") {
            const getCoverImgData = async() => {
                await axios.request({
                    url: `/file/${post.coverFile}`,
                    method: 'get',
                    responseType: "arraybuffer"
                })
                .then((res) => {
                    console.log(res)
                    setCoverImg({
                        data: Buffer.from(res.data, 'binary').toString('base64'),
                        /*@ts-ignore*/
                        type: res.headers.get("Content-Type")
                    } as ImageBufferData)
                })
                .catch((err) => {
                    console.log("Error getting img: ", err)
                    
                })
                .finally(() => {
                    
                })
            }

            getCoverImgData()
        }
    }, [])
    
    return (
        <div className={
            post.isAnnouncement && post.isPrivate
                    ?
                    "w-1/6 h-96 flex items-center border-4 border-gold border-shadow relative hover:cursor-pointer"
                    :
                        post.isAnnouncement
                        ?
                        "w-1/6 h-96 flex items-center border-4 border-gold relative hover:cursor-pointer"
                        :
                            post.isPrivate
                            ?
                            "w-1/6 h-96 flex items-center border-4 border-shadow relative hover:cursor-pointer"
                            :
                           "w-1/6 h-96 flex items-center border-2 border-shadow-green relative hover:cursor-pointer"
        }>

            {/*Displays either post caption or post cover image*/}
            {
                coverImg
                ?
                    coverImg.type === "image/png"
                    ?
                    <img className="w-full h-full object-cover" src={`data:image/png;base64,${coverImg.data}`} />
                    :
                    <img className="w-full h-full object-cover" src={`data:image/jpeg;base64,${coverImg.data}`} />
                :
                <h3 className="h-full w-full font-bold text-2xl flex items-center justify-center bg-shadow-green-offset">
                    {post.caption}
                </h3>
            }

            {/*Display likes and comments*/}
            <div className="absolute bottom-1 left-1">
                <h4>Likes: {post.likes}</h4>
                <h4>Comments: {post.comments}</h4>
            </div>

            {/*Display identifier*/}
            <div className="absolute top-1 left-1">
                <h4 className="text-blue font-bold">{post.identifier}</h4>
            </div>
        </div>
    )
}

export default ProfilePostCover;