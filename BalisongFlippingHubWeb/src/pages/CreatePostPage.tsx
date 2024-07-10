import { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import { PostCreationObject, PostCreationObjectLinkedPost } from "../modals/Post";

const CreatePostPage = () => {
    const [creatingLinkedPost, setCreatingLinkedPost] = useState(false)

    const [postObjSet, setPostObjSet] = useState(false)
    const [linkedPostObjSet, setLinkedPostObjSet] = useState(false)

    const [postObj, setPostObj] = useState<PostCreationObject | null>(null)
    const [linkedPostObj, setLinkedPostObj] = useState<PostCreationObjectLinkedPost | null>(null)

    const initiateCreatingLinkedPost = () => {
        setCreatingLinkedPost((prev) => !prev)
    }

    const createPostObj = (postObj: PostCreationObject) => {
        setPostObj(postObj)
    }

    const createLinkedPostObj = (postObj: PostCreationObjectLinkedPost) => {
        setLinkedPostObj(postObj)
    }

    const togglePostObjSet = () => {
        setPostObjSet((prev) => !prev)
    }   

    const toggleLinkedPostObjSet = () => {
        setLinkedPostObjSet((prev) => !prev)
    }

    return (
        <section className="flex flex-col">
            <div className="m-auto text-xl mt-10 mb-10 flex flex-col w-full items-center">
                <h2>Create New Post</h2> 
                <span className="h-1 bg-black w-5/6 mt-2 rounded-full"></span>
            </div>
            <div>
            {
                postObjSet
                ?
                <div className="absolute p-2 rounded border ml-10 bg-green-500">
                    <h3 className="bg-inherit">Set</h3>
                </div>
                :
                <div className="absolute p-2 rounded border ml-10 bg-red-700">
                    <h3 className="bg-inherit">Not Set</h3>
                </div>
                }
                <NewPostForm initiateCreatingLinkedPost={initiateCreatingLinkedPost} allowTimerSet={true} createPostObj={createPostObj} togglePostObjSet={togglePostObjSet}/>
            </div>            
            {
                creatingLinkedPost
                ?
                <div className="">
                    <div className="flex flex-col">
                        <span className="m-auto w-1 h-32 bg-black mt-5 mb-5"></span>
                        <h3 className="m-auto mb-2 text-xl">Linked Post</h3>
                        <span className="h-1 bg-black w-5/6 mt-2 rounded-full mb-5 m-auto"></span>    
                    </div>
                    
                    
                    {
                        linkedPostObjSet
                        ?
                        <div className="absolute p-2 rounded border ml-10 bg-green-500">
                            <h3 className="bg-inherit">Set</h3>
                        </div>
                        :
                        <div className="absolute p-2 rounded border ml-10 bg-red-700">
                            <h3 className="bg-inherit">Not Set</h3>
                        </div>
                    }
                   
                    <NewPostForm allowTimerSet={false} createLinkedPostObj={createLinkedPostObj} toggleLinkedPostObjSet={toggleLinkedPostObjSet}/>
                    <span className="h-1 bg-black w-5/6 mt-2 rounded-full m-auto"></span>
                </div>
                : 
                <></>
            }

            {
                postObjSet && linkedPostObjSet
                ?
                <div className="m-auto mt-5">
                    <button className="p-2 rounded bg-teal-500 text-xl" type="button">Create Post</button>
                </div>
                : 
                <div className="m-auto mt-5">
                    <button className="p-2 rounded bg-slate-300 text-xl text-black" type="button" disabled>Create Post</button>
                </div>
            }
        </section>
    )
}

export default CreatePostPage;