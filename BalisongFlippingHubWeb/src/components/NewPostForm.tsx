import { useRef, useState } from "react";

const NewPostForm = () => {
    const captionRef = useRef<HTMLTextAreaElement>(null)

    const [identifier, setIdentifier] = useState<string>("")
    const [identifierToggle, setIdentifierToggle] = useState(false)
    const [caption, setCaption] = useState("")
    const [toggleImageDisplay, setToggleImageDisplay] = useState(false)
    const [toggleCustomizationDisplay, setToggleCustomizationDisplay] = useState(false)
    const [togglePostPreview, setTogglePostPreview] = useState(false)

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
        setIdentifierToggle((prev) => !prev)
    }

    const handleAddImageClick = () => {
        if (toggleCustomizationDisplay) {
            setToggleCustomizationDisplay((prev) => !prev)
        }

        setToggleImageDisplay(true)
    }

    const handleCustomizePostClick = () => {
        if (toggleImageDisplay) {
            setToggleImageDisplay((prev) => !prev)
        }
        setToggleCustomizationDisplay(true)
    }

    return (
        <form className="border w-2/3 bg-slate-300 rounded flex flex-col items-center">
            <div className="w-full border-b border-black bg-inherit p-1 flex justify-between">
                {
                    identifier === "" 
                    ?
                    <>
                        <input type="text" placeholder="Set Post Identifier" list="tag-list" className="bg-inherit border border-black rounded text-black p-1" onChange={(e) => handleChangeTag(e)} />
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
                <p className="border rounded-full p-2">Your Image</p>
            </div>
            <textarea className="h-20 w-full bg-inherit text-black p-2 border-b border-black" placeholder="Add a caption..." ref={captionRef} value={caption} onChange={(e) => setCaption(e.target.value)}/>
            {
                toggleImageDisplay
                ?
                <input type="file" />
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
                <div className="absolute top-0 right-0 left-0 bottom-0 z-30 bg-black/70 flex justify-center items-center">
                    <h1>Post Preview</h1>
                </div>
                :
                <></>
            }
        </form>
    )
}

export default NewPostForm;