import { useState } from "react";

interface params {
    files: Array<File>
}

const PostFilesDisplay = ({ files }: params) => {
    const [currentFileIndex, setCurrentfileIndex] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)
    
    const toggleNextImg = () => {
        if (files.length === 1) {
            return
        }

        if (currentFileIndex === files.length - 1) {
            setCurrentfileIndex(0)
        }
        else {
            setCurrentfileIndex((prev) => ++prev)
        }
    }

    const toggleNextImgReverse = () => {
        if (files.length === 1) {
            return
        }

        if (currentFileIndex === 0) {
            setCurrentfileIndex(files.length - 1)
        }
        else {
            setCurrentfileIndex((prev) => --prev)
        }
    }

    if (fullScreen) {
        return (
            <div className="absolute right-0 top-0 left-0 bottom-0 bg-black">
                {
                    files.length === 1
                    ?
                    <></>
                    :
                    <>
                        <button type="button" onClick={toggleNextImg} className="absolute text-7xl p-2 rounded-2xl border top-[46%] right-4 opacity-15 hover:opacity-100">{`>`}</button>
                        <button type="button" onClick={toggleNextImgReverse} className="absolute text-7xl p-2 rounded-2xl border top-[46%] left-4 opacity-15 hover:opacity-100">{`<`}</button>
                    </>
                }
                <img src={URL.createObjectURL(files[currentFileIndex])} className="object-contain w-full h-full" />
                <button type="button" onClick={() => setFullScreen((prev) => !prev)} className="absolute right-5 text-5xl bottom-5 opacity-15 hover:opacity-100">{`[]`}</button>
            </div>
        )
    }
    else {
        return (
            <div className="w-full h-96 relative bg-black">
                {
                    files.length === 1
                    ?
                    <></>
                    :
                    <>
                        <button type="button" onClick={toggleNextImg} className="absolute text-5xl p-2 rounded-2xl border top-36 right-4 opacity-15 hover:opacity-100">{`>`}</button>
                        <button type="button" onClick={toggleNextImgReverse} className="absolute text-5xl p-2 rounded-2xl border top-36 left-4 opacity-15 hover:opacity-100">{`<`}</button>
                    </>
                }
                <img src={URL.createObjectURL(files[currentFileIndex])} className="object-contain w-full h-full" />
                <button type="button" onClick={() => setFullScreen((prev) => !prev)} className="absolute right-5 text-5xl bottom-5 opacity-15 hover:opacity-100">{`[]`}</button>
            </div>
        )
    }  
}

export default PostFilesDisplay;