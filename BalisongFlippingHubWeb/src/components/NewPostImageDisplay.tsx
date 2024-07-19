import { useEffect, useRef, useState } from "react"

interface props {
    files: File[],
    filesAutoFocus: boolean,
    deleteSelectedFile: Function
}

const NewPostImageDisplay = ({ files, deleteSelectedFile, filesAutoFocus} : props) => {
    const scrollRef = useRef<HTMLInputElement>(null)
    
    const [currIndex, setCurrIndex] = useState(0)
    const [loadingDelete, setLoadingDelete] = useState(false)
    
    const handleDelete = () => {
        setLoadingDelete(true)
        deleteSelectedFile(currIndex)
        
        if (currIndex !== 0) {
            setCurrIndex((prev) => --prev)
        }
        setLoadingDelete(false)
    }

    const handleKeyPress = (e: string) => {
        
        switch (e) {
            case "ArrowRight":
                if (currIndex === files.length - 1) {
                    setCurrIndex(0)
                }
                else {
                    setCurrIndex((prev) => ++prev)
                }
                return;
            case "ArrowLeft":
                if (currIndex === 0) {
                    setCurrIndex(files.length - 1) 
                }
                else {
                    setCurrIndex((prev) => --prev)
                }
                return;
            default:
                return;
        }
    }

    useEffect(() => {
        scrollRef.current?.focus()
    }, [filesAutoFocus])

    if (files.length === 0) {
        return <></>
    }

    return (
        <div className="bg-black w-full">
            <div className="w-full h-96 relative">
                <img src={URL.createObjectURL(files[currIndex])} className="w-full h-full object-contain" />
                {
                    loadingDelete
                    ?
                    <button type="button" disabled className="absolute p-2 top-5 left-5 bg-shadow-green-offset rounded-lg text-xl w-10" onClick={handleDelete}>X</button>
                    :
                    <button type="button" className="absolute p-2 top-5 left-5 bg-shadow-green-offset rounded-lg text-xl w-10" onClick={handleDelete}>X</button>
                }
            </div>
            {
                files.length > 1
                ?
                <div className="flex justify-center border-t-4 border-shadow-green-offset">
                {
                    filesAutoFocus
                    ?
                    <input className="absolute -top-10"  onKeyDown={(e) => handleKeyPress(e.code)} ref={scrollRef} autoFocus={true} onBlur={() => scrollRef.current?.focus()}/>
                    :
                    <input className="absolute -top-10"  ref={scrollRef} disabled />
                }       
                {
                    files.map((file, i) => {
                        if (i === currIndex) {
                           return (
                            <div className="w-40 h-40" key={i}>
                                <img src={URL.createObjectURL(file)}  className="object-cover w-full h-full border-4 border-shadow-green-offset" />
                            </div>
                           )
                        }
                        else {
                            return (
                                <div className="w-40 h-40" key={i}>
                                    <img src={URL.createObjectURL(file)}  className="object-cover w-full h-full hover:cursor-pointer" onClick={() => setCurrIndex(i)}/>
                                </div>
                            )
                        }
                    })
                }
                </div>
                :
                <></>
            }
        </div>
    )
}

export default NewPostImageDisplay;