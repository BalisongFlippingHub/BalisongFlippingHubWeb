import { useRef, useState } from "react";

const NewPostForm = () => {
    const captionRef = useRef<HTMLTextAreaElement>(null)

    const [caption, setCaption] = useState("")

    return (
        <form className="border w-2/3 bg-slate-300 rounded flex flex-col items-center">
            <textarea className="h-40 w-full bg-inherit text-black p-2" ref={captionRef} value={caption} onChange={(e) => setCaption(e.target.value)}/>

            <button type="submit" className="w-30 bg-black rounded p-2">Add Post</button>
        </form>
    )
}

export default NewPostForm;