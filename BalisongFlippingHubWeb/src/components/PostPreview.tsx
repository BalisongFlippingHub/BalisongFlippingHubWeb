import useAuth from "../hooks/useAuth";
import { PostPreview } from "../modals/Post";
import PostFilesDisplay from "./PostFilesDisplay";
import ProfileImgDisplay from "./ProfileImgDisplay";

type params = {
    postObj: PostPreview
}

const PostPreviewComponent = ({ postObj }: params) => {

    const { user } = useAuth()

    return (
        <div className={
            postObj.isAnnouncement
            ?
            "m-auto w-3/5 flex flex-col rounded-lg mt-5 mb-5 border border-gold border-4"
            :
                postObj.isPrivatePost
                ?
                "m-auto w-3/5 flex flex-col rounded-lg mt-5 mb-5 border border-shadow border-4"
                :
                "m-auto w-3/5 flex flex-col rounded-lg mt-5 mb-5 border border-shadow-green-offset border-4"
        }>

        <div className="flex justify-between p-2 border-b-2 border-shadow-green-offset">
            {/*Profile Data and post manipulation*/}
            <div className="flex">
                <div className="rounded-full w-12 h-12 overflow-hidden">
                    <ProfileImgDisplay imgStr={user?.profileImg}/>
                </div>
                <div className="ml-2">
                    <h3 className="text-2xl">{postObj.creatorName}</h3>
                    <h5 className="text-sm text-shadow">Now</h5>
                </div>
            </div>

            <div className="flex flex-col-reverse justify-between">
                {
                    postObj.isAnnouncement && postObj.isPrivatePost
                    ?
                    <div className="text-lg">
                        <h3 className="text-shadow">Private Annoucement</h3>
                    </div>
                    :
                        postObj.isAnnouncement
                        ?
                        <div className="text-lg">
                            <h3 className="text-shadow">Announcement</h3>
                        </div>
                        :
                            postObj.isPrivatePost
                            ?
                            <div className="text-lg">
                                <h3 className="text-shadow">Private</h3>
                            </div>
                            :
                            <div>
                                <h3 className="invisible">fill</h3>
                            </div>
                }

                <div className="flex place-self-end items-center">
                    <div className="flex flex-col">
                        <span className="bg-white h-1 w-1 mb-1"></span>
                        <span className="bg-white h-1 w-1 mb-1"></span>
                        <span className="bg-white h-1 w-1"></span>
                    </div>
                </div>
            </div>
        </div>

        {/*Post Caption And Identifier Display*/}
        <div className="flex flex-col">
            {
                postObj.identifer === ""
                ?
                <></>
                :
                <div className="flex mb-1 p-2">
                    <h3 className="bg-shadow-green-offset p-2 rounded-full">{postObj.identifer}</h3>
                </div>
            }

            {
                postObj.caption === ""
                ?
                <></>
                :
                <div className="p-2">
                    <p className="text-2xl">{postObj.caption}</p>
                </div>
            }
            
        </div>
    
            {/*Display Files*/}
            {
                postObj.files.length !== 0
                ?
                <PostFilesDisplay files={postObj.files} />
                :
                <></>
            }
                
            <div className="flex justify-between bg-shadow-green-offset p-2">
                {/*Post Interactivity*/}
                <div className="flex">
                    <div className="w-7 h-7 rounded-full bg-white mr-2 flex justify-center items-center font-bold">
                        <h5 className="text-black">H</h5>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white mr-2 flex justify-center items-center font-bold">
                        <h5 className="text-black">C</h5>
                    </div>
                </div>

                <div>
                    <div className="w-7 h-7 rounded-full bg-white mr-2 flex justify-center items-center font-bold">
                        <h5 className="text-black">S</h5>
                    </div>
                </div>
            </div>

            {/*Display Description*/}
            <div className="flex p-2 flex-col border-t-4 border-shadow-green">
                <div className="flex mb-2">
                    <p className="mr-3 text-shadow">{postObj.likes} likes</p>
                    <p className="text-shadow">0 comments</p>
                </div>

                <div className="">
                    {
                        postObj.description !== ""
                        ?
                        <>
                            <p className="text-shadow">description...</p>
                            <p className="text-shadow">{postObj.description}</p>
                        </>
                        :                        
                        <></>
                    }
                </div>
            </div>

            {/*Comments Component*/}
            
        </div>
    )
}

export default PostPreviewComponent; 