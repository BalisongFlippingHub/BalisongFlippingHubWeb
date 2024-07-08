import { ChangeEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import PostPreviewComponent from "./PostPreview";
import { PostPreview } from "../modals/Post";
import NewPostImageDisplay from "./NewPostImageDisplay";

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
        const files: FileList | null = e.target.files; 

        if (!files || selectedFiles.length > 12) {
            return; 
        }
        
        const addFiles: File[] = []
        var duplicateFound: boolean

        for (var i = 0; i < files.length; i++) {
            duplicateFound = false
            for (var j = 0; j < selectedFiles.length; j++) {
                if (selectedFiles[j].name === files[i].name && selectedFiles[j].size === files[i].size && selectedFiles[j].type === files[i].type) {
                    duplicateFound = true
                    break
                }
            }

            if (!duplicateFound && selectedFiles.length + addFiles.length + 1 != 12) {
                addFiles.push(files[i])
            }
        }

        setSelectedFiles((prev) => [...prev, ...addFiles])

        if (!toggleImageDisplay) {
            if (selectedFiles.length > 0) setToggleImageDisplay(true)
        }

        setCurrentFiles("")
    }

    const deleteSelectedFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_file, i) => {
            return index !== i
        }))
    }

    const createPostObj = () => {
        if (user?.role === "USER") {
            return {
                id: "1",
                caption: caption,
                creatorId: user?.id,
                creatorName: user?.displayName,
                creatorProfileImg: user?.profileImg,
                creationDate: "now",
                files: selectedFiles,
                comments: null,
                likes: 0,
                identifer: identifier
            } as PostPreview
        }
        else if (user?.role === "MAKER") {
            return {
                id: "1",
                caption: caption,
                creatorId: user?.id,
                creatorName: user?.compnayName,
                creatorProfileImg: user?.profileImg,
                creationDate: "now",
                files: selectedFiles,
                comments: null,
                likes: 0,
                identifer: identifier
            } as PostPreview
        }
        else {
            return {
                id: "1",
                caption: caption,
                creatorId: user?.id,
                creatorName: "ADMIND",
                creatorProfileImg: null,
                creationDate: "now",
                files: selectedFiles,
                comments: null,
                likes: 0,
                identifer: identifier
            } as PostPreview
        }
    }

    return (
        <form className="border w-2/3 bg-slate-300 rounded flex flex-col items-center mt-36">
            <div className="w-full border-b border-black bg-inherit p-1 flex justify-between">
                {/*Identifier Tag*/}
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
                {/*File Input field*/}
                <input type="file" ref={fileRef} className="collapse" accept=".png,.jpg" value={currentFiles} onChange={(e) => handleFileChange(e)}/>
                
                {/*Profile Img Display*/}
                <p className="border rounded-full p-2">Your Image</p>
            </div>

            {/*Text Area for post caption*/}
            <textarea className="h-20 w-full bg-inherit text-black p-2 border-b border-black" placeholder="Add a caption..." ref={captionRef} value={caption} onChange={(e) => setCaption(e.target.value)}/>

            {/*Display of selected files*/}
            {
                <NewPostImageDisplay files={selectedFiles} deleteSelectedFile={deleteSelectedFile} />
            }

            {
                selectedFiles.length > 0
                ?
                <textarea className="h-20 w-full bg-inherit text-black p-2 border-b border-black" placeholder="Add a description..."/>
                :
                <></>
            }
            
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
                    <h2 className="absolute text-2xl top-4 right-4 bg-inherit hover:cursor-pointer" onClick={() => setTogglePostPreview((prev) => !prev)}>X</h2>
                    <PostPreviewComponent postObj={(createPostObj())} />
                </div>
                :
                <></>
            }
        </form>
    )
}

export default NewPostForm;