import { useState } from "react";
import NewPostForm from "../components/NewPostForm";

const CreatePostPage = () => {
    const [creatingLinkedPost, setCreatingLinkedPost] = useState(false)

    const initiateCreatingLinkedPost = () => {
        setCreatingLinkedPost((prev) => !prev)
    }

    return (
        <section className="flex flex-col">
            <div className="m-auto text-xl mt-10 mb-10 flex flex-col w-full items-center">
                <h2>Create New Post</h2> 
                <span className="h-1 bg-black w-5/6 mt-2 rounded-full"></span>
            </div>
            <NewPostForm initiateCreatingLinkedPost={initiateCreatingLinkedPost} allowTimerSet={true}/>
            {
                creatingLinkedPost
                ?
                <div className="flex flex-col">
                    <span className="m-auto w-1 h-32 bg-black mt-5 mb-5"></span>
                    <h3 className="m-auto mb-2 text-xl">Linked Post</h3>
                    <span className="h-1 bg-black w-5/6 mt-2 rounded-full mb-5 m-auto"></span>
                    <NewPostForm allowTimerSet={false}/>
                    <span className="h-1 bg-black w-5/6 mt-2 rounded-full mb-5 m-auto"></span>
                </div>
                : 
                <></>
            }
        </section>
    )
}

export default CreatePostPage;