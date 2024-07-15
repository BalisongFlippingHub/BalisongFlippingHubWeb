import { ChangeEvent, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import PostPreviewComponent from "./PostPreview";
import { CreationPostDTO, PostPreview } from "../modals/Post";
import NewPostImageDisplay from "./NewPostImageDisplay";

interface params  {
    initiateCreatingLinkedPost?: Function,
    createPostObjDto?: Function,
    getPostObjFiles?: Function,
    createLinkedPostObjDto?: Function,
    getLinkedPostObjFiles?: Function,
    togglePostObjSet?: Function,
    toggleLinkedPostObjSet?: Function
    allowTimerSet: boolean
}

const NewPostForm = ({ initiateCreatingLinkedPost, allowTimerSet, toggleLinkedPostObjSet, togglePostObjSet, createPostObjDto, createLinkedPostObjDto, getPostObjFiles, getLinkedPostObjFiles }: params) => {
    const captionRef = useRef<HTMLTextAreaElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const [identifier, setIdentifier] = useState<string>("")
    const [caption, setCaption] = useState("")
    const [description, setDescription] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])
    const [currentFiles, setCurrentFiles] = useState("")
    const [isAnnouncement, setIsAnnouncement] = useState(false)
    const [isPrivatePost, setIsPrivatePost] = useState(false) 
    const [timerSet, setTimerSet] = useState(false)
    const [timerValue, setTimerValue] = useState("Not Set")

    const [alert, setAlert] = useState("")

    const [toggleImageDisplay, setToggleImageDisplay] = useState(false)
    const [togglePostPreview, setTogglePostPreview] = useState(false)

    const { user } = useAuth()

    const identifierList = [
        "Sell",
        "Trade",
        "Sell/Trade",
        "Flipping", 
        "Collection", 
        "Show-Off",
        "Mod-Work",
        "Inquiry"
    ]

    const captionOnlyIdentifierList = [
        "Inquiry",
        "GibbleGobble"
    ]

    const handleChangeTag = (e: string) => {
        if (selectedFiles.length === 0) {
            if (!captionOnlyIdentifierList.includes(e)) {
                return
            }

            setIdentifier(e)
        }
        else {
            if (!identifierList.includes(e)) {
                return
            }
    
            setIdentifier(e)
        }
    }

    const handleAddImageClick = () => {
        fileRef.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files; 

        if (!files || selectedFiles.length > 12) {
            setCurrentFiles("")
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

            if (!duplicateFound && selectedFiles.length + addFiles.length + 1 != 13) {
                if (timerSet) {
                    if (addFiles.length === 1) {
                        setAlert("A post with a set timer can only have 1 image or video selected.")
                        return
                    }
                }
                addFiles.push(files[i])
            }
        }

        setSelectedFiles((prev) => [...prev, ...addFiles])

        if (!toggleImageDisplay) {
            if (selectedFiles.length > 0) setToggleImageDisplay(true)
        }

        if (alert !== "") setAlert("")

        setCurrentFiles("")
    }

    const deleteSelectedFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_file, i) => {
            return index !== i
        }))
    }

    const togglePreview = () => {
        if (selectedFiles.length === 0) {
            if (caption.trim() === "") {
                setAlert("*Post must have a caption if no images/videos selected")
                captionRef.current?.focus()
                return
            }
        }

        if (allowTimerSet) {
            if (togglePostObjSet) {
                togglePostObjSet()
                if (createPostObjDto) {
                    if (togglePostPreview) {
                        createPostObjDto(null)
                        if (getPostObjFiles) getPostObjFiles(null)
                    }
                    else {
                        createPostObjDto(createPostDto)
                        if (getPostObjFiles) getPostObjFiles(selectedFiles) 
                    }
                }
            }
        }
        else {
            if (toggleLinkedPostObjSet) {
                toggleLinkedPostObjSet()
                if (createLinkedPostObjDto) {
                    if (togglePostPreview) {
                        createLinkedPostObjDto(null)
                        if (getLinkedPostObjFiles) getLinkedPostObjFiles(null)
                    }
                    else {
                        createLinkedPostObjDto(createPostDto)
                        if (getLinkedPostObjFiles) getLinkedPostObjFiles(selectedFiles)
                    }
                }
            }
        }

        setTogglePostPreview((prev) => !prev)
    }

    const handleSetTimerClick = () => {
        if (timerSet) {
            setTimerValue("Not Set")
            setTimerSet((prev) => !prev)
        }
        else {
            setTimerValue("24")
            setTimerSet((prev) => !prev)

            if (selectedFiles.length > 1) {
                setSelectedFiles([])
                setAlert("Post set with timer can only have 1 image or video.")
            }
        }

        if (initiateCreatingLinkedPost) {
            initiateCreatingLinkedPost()
        }
    }

    const setCaptionOnChange = (e: string) => {
        if (alert !== "") {
            setAlert("")
        }

        if (e.length > 255) {
            return
        }

        setCaption(e)
    }
    
    const createPostDto = () => {
        return {
            caption: caption,
            description: description,
            creatorId: user?.id,
            identifier: identifier,
            isPrivatePost: isPrivatePost,
            isAnnouncement: isAnnouncement,
            hasTimer: timerSet,
            timerInHours: timerValue
        } as CreationPostDTO
    }

    const createPostPreview = () => {
        if (user?.role === "USER") {
            return {
                id: "1", 
                caption: caption,
                description: description,
                creatorName: user?.displayName,
                creatorProfileImg: user?.profileImg,
                creationDate: "Now",
                files: selectedFiles,
                likes: 0,
                identifer: identifier,
                isAnnouncement: isAnnouncement,
                isPrivatePost: isPrivatePost,
                hasTimer: timerSet,
                timeInHours: timerValue
            } as PostPreview
        }
        else if (user?.role === "MAKER") {
            return {
                id: "1", 
                caption: caption,
                description: description,
                creatorName: user?.compnayName,
                creatorProfileImg: user?.profileImg,
                creationDate: "Now",
                files: selectedFiles,
                likes: 0,
                identifer: identifier,
                isAnnouncement: isAnnouncement,
                isPrivatePost: isPrivatePost,
                hasTimer: timerSet,
                timeInHours: timerValue
            } as PostPreview
        }
        else {
            return {
                id: "1", 
                caption: caption,
                description: description,
                creatorName: "ADMIN",
                creatorProfileImg: null,
                creationDate: "Now",
                files: selectedFiles,
                likes: 0,
                identifer: identifier,
                isAnnouncement: isAnnouncement,
                isPrivatePost: isPrivatePost,
                hasTimer: timerSet,
                timeInHours: timerValue
            } as PostPreview
        }
    }

    if (togglePostPreview) {
        return (
            <div className="flex flex-col">
                <PostPreviewComponent postObj={createPostPreview()}/>
                <div className="m-auto mt-10 text-lg">
                    <button className="rounded border p-2" type="button" onClick={togglePreview}>Edit Post</button>
                </div>
                <span className="h-2 w-5/6 rounded bg-black m-auto mt-10"></span>
            </div>
        )
    }
    else {
        return (
            <form className="border w-2/3 bg-slate-300 rounded flex flex-col items-center m-auto">
                <div className="w-full border-b border-black bg-inherit p-1 flex justify-between">
                    {/*Identifier Tag*/}
                    {
                        identifier === "" 
                        ?
                        <>
                            <input type="text" placeholder="Add Tag +" list="tag-list" className="w-32 bg-inherit border border-black rounded text-black p-2" onChange={(e) => handleChangeTag(e.target.value)}  />
                            {
                                selectedFiles.length !== 0
                                ?
                                <datalist id="tag-list">
                                {
                                    identifierList.map((identifier, i) => <option key={i}>{identifier}</option>)
                                }
                                </datalist>
                                :
                                <datalist id="tag-list">
                                {
                                    captionOnlyIdentifierList.map((identifer, i) => <option key={i}>{identifer}</option>)
                                }
                                </datalist>
                            }
                            {
                                alert === ""
                                ?
                                <></>
                                :
                                <h4 className="bg-inherit text-red-400 text-lg p-2">{alert}</h4>
                            }
                        </>
                        :
                        <div className="flex p-2 rounded-full">
                            <p className="pr-2 text-lg font-bold">{identifier}</p>
                            <button className="text-sm hover:text-lg" type="button" onClick={() => setIdentifier("")}>x</button>
                        </div>
                    }
                    
                    {/*File Input field*/}
                    <input type="file" ref={fileRef} multiple className="collapse" accept=".png,.jpg" value={currentFiles} onChange={(e) => handleFileChange(e)}/>
                    
                    {/*Profile Img Display*/}
                    <p className="border rounded-full p-2">Your Image</p>
                </div>

                {/*Text Area for post caption*/}
                <textarea className="h-20 w-full bg-inherit text-black p-2 border-b border-black text-xl" placeholder="Add a caption..." ref={captionRef} value={caption} onChange={(e) => setCaptionOnChange(e.target.value)}/>

                {/*Display of selected files*/}
                {
                    <NewPostImageDisplay files={selectedFiles} deleteSelectedFile={deleteSelectedFile} />
                }

                {
                    selectedFiles.length > 0
                    ?
                    <textarea className="h-20 w-full bg-inherit text-black p-2 border-b border-t border-black" placeholder="Add a description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    :
                    <></>
                }
                
                <div className="w-full justify-around flex bg-inherit p-2 items-center">
                    <button className="w-30 bg-black rounded p-2" type="button" onClick={handleAddImageClick}>Add Image/Video</button>
                    <button className="w-30 bg-black rounded p-2" type="button" onClick={togglePreview}>Add Post</button>
                    <div className="flex flex-col bg-inherit text-lg p-1">
                        <div className="bg-inherit">
                            <input type="checkbox" className="" onChange={() => setIsPrivatePost((prev) => !prev)}/>
                            <label className="bg-inherit text-black font-bold ml-2">Private Post</label>
                        </div>
                        
                        {
                            allowTimerSet
                            ?
                            <>
                                <div className="bg-inherit">
                                <input type="checkbox" onClick={handleSetTimerClick}/>
                                <label className="bg-inherit text-black font-bold ml-2">Set Timer</label>
                                </div>
                                {
                                    !timerSet
                                    ?
                                    <></>
                                    :
                                    <div className="bg-inherit">
                                        <input type="range" min="24" max="168" value={timerValue} onChange={(e) => setTimerValue(e.target.value)} />
                                        <label className="bg-inherit text-black font-bold ml-2">Hours: {timerValue}</label>
                                    </div>
                                }
                            </>
                            :
                            <></>
                        }
        
                        {
                            user?.role === "USER"
                            ?
                            <></>
                            :
                            <div className="bg-inherit"> 
                                <input type="checkbox" className="" onChange={() => setIsAnnouncement((prev) => !prev)}/>
                                <label className="bg-inherit text-black font-bold ml-2">Set As annoucement</label>
                            </div>
                        }
                    </div>
                </div>
            </form>
        )
    }
}

export default NewPostForm;