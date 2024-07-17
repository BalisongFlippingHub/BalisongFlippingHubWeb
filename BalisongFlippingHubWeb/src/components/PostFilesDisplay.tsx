import { useState } from "react";

interface params {
    files: Array<File>
}

const PostFilesDisplay = ({ files }: params) => {
    const [currentFile, setCurrentfile] = useState(files[0])
    
    return (
        <div className="w-full h-96 bg-shadow-green">

            <img src={URL.createObjectURL(currentFile)} className="object-cover w-full h-full" />
        </div>
    )
}

export default PostFilesDisplay;