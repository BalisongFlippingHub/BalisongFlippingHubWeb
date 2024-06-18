import { ChangeEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Post } from "../modals/Post";
import PostPreview from "./PostPreview";

const NewPostForm = () => {
    const captionRef = useRef<HTMLTextAreaElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const [identifier, setIdentifier] = useState<string>("")
    const [caption, setCaption] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])
    const [currentFiles, setCurrentFiles] = useState("")

    const [toggleImageDisplay, setToggleImageDisplay] = useState(false)
    const [toggleCustomizationDisplay, setToggleCustomizationDisplay] = useState(false)
    const [togglePostPreview, setTogglePostPreview] = useState(false)

    const { user } = useAuth()

    const identifierList = [
        "Sell",
        "Trade",
        "Sell/Trade",
        "Flipping", 
        "Collection", 
        "Show-Off",
        "Mod-Work"
    ]

    const handleChangeTag = (e: any) => {
        if (!identifierList.includes(e.target.value)) {
            return
        }
        setIdentifier(e.target.value)
        
    }

    const handleAddImageClick = () => {
        fileRef.current?.click()
    }

    const handleCustomizePostClick = () => {
        setToggleCustomizationDisplay((prev) => !prev)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) {
            return; 
        }

        setToggleImageDisplay(true)
        setSelectedFiles((prev) => [...prev, ...files])
        setCurrentFiles("")
    }

    const createPostObj = () => {
        if (user?.role === "MAKER") {
            return {
                creationDate: Date(),
                creatorId: user?.uuid,
                creatorName: user?.compnayName,
                caption: caption,
                captionTop: false,
                creatorProfileImg: user?.profileImg,
                files: selectedFiles,
                comments: [],
                likes: 0,
                tag: identifier
            } as Post
        }
        else if (user?.role === "USER") {
            return {
                creationDate: Date(),
                creatorId: user?.uuid,
                creatorName: user?.displayName,
                caption: caption,
                captionTop: false,
                creatorProfileImg: user?.profileImg,
                files: selectedFiles,
                comments: [],
                likes: 0,
                tag: identifier
            } as Post
        }
        else {
            return {
                creationDate: Date(),
                creatorId: user?.uuid,
                creatorName: "ADMIN",
                caption: caption,
                captionTop: false,
                files: selectedFiles,
                comments: [],
                likes: 0,
                tag: identifier
            } as Post
        }
    }

    return (
        <form className="border w-2/3 bg-slate-300 rounded flex flex-col items-center">
            <div className="w-full border-b border-black bg-inherit p-1 flex justify-between">
                {
                    identifier === "" 
                    ?
                    <>
                        <input type="text" placeholder="Add Tag +" list="tag-list" className="w-32 bg-inherit border border-black rounded text-black p-2" onChange={(e) => handleChangeTag(e)} />
                        <datalist id="tag-list">
                            {
                                identifierList.map((identifier, i) => <option key={i}>{identifier}</option>)
                            }
                        </datalist>
                    </>
                    :
                    <div className="flex p-2 rounded-full">
                        <p className="pr-2 text-lg font-bold">{identifier}</p>
                        <button className="text-sm hover:text-lg" type="button" onClick={() => setIdentifier("")}>x</button>
                    </div>
                }
                <input type="file" ref={fileRef} className="collapse" accept=".png,.jpg" value={currentFiles} onChange={(e) => handleFileChange(e)}/>
                <p className="border rounded-full p-2">Your Image</p>
            </div>
            {
                toggleImageDisplay
                ?
                <div className="w-full h-96 bg-inherit flex overflow-scroll">
                    {
                        selectedFiles.map((file, i) => <img src={URL.createObjectURL(file)} key={i} className="object-cover h-full w-full bg-inherit" />)
                    }
                </div>
                :
                <></>
            }
            <textarea className="h-20 w-full bg-inherit text-black p-2 border-b border-black" placeholder="Add a caption..." ref={captionRef} value={caption} onChange={(e) => setCaption(e.target.value)}/>
            {
                toggleCustomizationDisplay
                ?
                <div>
                    <h1>Customize Info</h1>
                </div>
                :
                <></>
            }
            <div className="w-full justify-around flex bg-inherit p-2">
                <button className="w-30 bg-black rounded p-2" type="button" onClick={handleAddImageClick}>Add Image/Video</button>
                <button className="w-30 bg-black rounded p-2" type="button" onClick={() => setTogglePostPreview((prev) => !prev)}>Add Post</button>
                <button className="w-30 bg-black rounded p-2" type="button" onClick={handleCustomizePostClick}>Customize Post</button>
            </div>
            {
                togglePostPreview
                ?
                <div className="absolute top-0 right-0 left-0 bottom-0 z-30 bg-black/90 flex justify-center items-center ">
                    <PostPreview postObj={(createPostObj())} />
                </div>
                :
                <></>
            }
        </form>
    )
}

export default NewPostForm;