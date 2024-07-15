import { useEffect, useState } from "react"
import { Post } from "../modals/Post"
import axios from "../api/axios"
import ProfileImgDisplay from "./ProfileImgDisplay"
import PostCommentsComponent from "./PostCommentsComponent"

interface params {
    postId?: string,
    post?: Post,
    isNewlyCreatedPost: boolean
}

const PostDisplay = ({ postId, post, isNewlyCreatedPost }: params) => {
    const [postData, setPostData] = useState<Post | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)

        if (!post) {
            // load post data from api
            const getPostData = async () => {
                await axios.request({
                url: `/posts/any/${postId}`,
                method: 'get',
                })
                .then((res) => {
                    // upon success
                    console.log(res)

                    // set post data
                    setPostData(res.data)
                })
                .catch((err) => {
                    // failed to post new post to db
                    console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
            }   

            getPostData()
        }
        else {
            setPostData(post)
            setIsLoading(false)
        }
    },[])

    if (isLoading) {
        return (
            <h3>Loading...</h3>
        )
    }
    else {
        return (
            <div className="m-auto w-2/3 flex flex-col bg-inherit rounded mt-5 mb-5 border">
                <div className="flex justify-between p-2 border-b">
                    {/*Profile Data and post manipulation*/}
                    <div className="flex">
                        <div className="rounded-full bg-white w-12 h-12">
                            <ProfileImgDisplay imgStr={postData?.creatorProfileImg}/>
                        </div>
                        <div className="ml-1">
                            <h3>{postData?.creatorName}</h3>
                            <h5>{postData?.creationDate}</h5>
                        </div>
                    </div>
    
                    <div className="flex flex-col place-self-center">
                        <span className="h-1 bg-white w-1 mb-1"></span>
                        <span className="h-1 bg-white w-1 mb-1"></span>
                        <span className="h-1 bg-white w-1"></span>
                    </div>
                </div>
    
                {/*Type of post data*/}
                {
                    !postData?.identifier
                    ?
                    <></>
                    :
                    <div className="w-full flex p-2">
                        <div className="bg-teal-700 p-2 rounded-full">
                            <h3 className="bg-inherit">{postData?.identifier}</h3>
                        </div>
                 </div>
                }
    
                {/*Post Caption*/}
                {
                    postData?.caption === ""
                    ?
                    <></>
                    :
                    <div className="w-full p-2 text-xl font-bold">
                        <p>{postData?.caption}</p>
                    </div>
                }
    
                {/*Display Files*/}
                {
                    postData?.files
                    ?
                    <div className="h-20 w-full border-t">
    
                    </div>
                    : 
                    <></>
                }
                    
                <div className="flex justify-between border-t border-b p-2">
                    {/*Post Interactivity*/}
                    <div>
                        <h4>Heart</h4>
                    </div>
    
                    <div>
                        <h4>Bookmark</h4>
                    </div>
                </div>
    
                {/*Display Description*/}
                {
                    !postData?.description
                    ?
                    <></>
                    :
                    <div className="w-full">
                        <p>{postData.description}</p>
                    </div>
                }
    
                {/*Comments Component*/}
                <PostCommentsComponent postComments={postData?.comments}/>
            </div>
        )
    }
}

export default PostDisplay