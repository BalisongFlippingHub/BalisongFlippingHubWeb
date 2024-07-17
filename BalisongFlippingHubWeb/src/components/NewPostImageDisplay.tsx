import { useState } from "react"

interface props {
    files: File[],
    deleteSelectedFile: Function
}

const NewPostImageDisplay = ({ files, deleteSelectedFile} : props) => {
    const [currIndex, setCurrIndex] = useState(0)
    
    if (files.length === 0) {
        return <></>
    }

    return (
        <div className="w-full">
            <div className="w-full h-96 relative">
                <img src={URL.createObjectURL(files[currIndex])} className="w-full h-full object-contain" />
                <button type="button" className="absolute p-2 top-5 left-5 bg-shadow-green-offset rounded-lg" onClick={() => deleteSelectedFile(currIndex)}>Delete File</button>
            </div>

            {
                files.length > 1
                ?
                <div className="w-full flex justify-center">
                {
                    files.map((file, i) => {
                        if (i === currIndex) {
                           return (
                            <div className="w-40 h-40">
                                <img src={URL.createObjectURL(file)} key={i} className="object-cover w-full h-full border rounded" />
                            </div>
                           )
                        }
                        else {
                            return (
                                <div className="w-40 h-40">
                                    <img src={URL.createObjectURL(file)} key={i} className="object-cover w-full h-full hover:cursor-pointer" onClick={() => setCurrIndex(i)}/>
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