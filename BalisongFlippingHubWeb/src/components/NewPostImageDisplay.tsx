
interface props {
    files: File[],
    deleteSelectedFile: Function
}

const NewPostImageDisplay = ({ files, deleteSelectedFile} : props) => {

    if (files.length === 0) {
        return <></>
    }

    return (
        <div className="w-full grid grid-cols-4 grid-rows-* bg-inherit">
            {
                files.map((file, i) => {
                    return (
                        <div key={i} className="flex flex-col h-64">
                            <img src={URL.createObjectURL(file)} className="object-cover w-full h-full" />
                            <button type="button" onClick={() => deleteSelectedFile(i)} className="absolute bg-white text-black translate-y-2 translate-x-2 p-1 m-auto rounded text-lg">Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NewPostImageDisplay;