import { useRef, useState } from "react"

interface params {
    updateGalleryFiles: Function, 
    galleryFiles: Array<File> | null
}

const GalleryInput = ({ updateGalleryFiles, galleryFiles }:params ) => {
    const filesInputRef = useRef<HTMLInputElement>(null)
    
    const [selectedFiles, setSelectedFiles] = useState<Array<File> | null>(galleryFiles)
    const [selectedFilesNames, setSelectedFilesNames] = useState<Array<string>>([])

    const [currentIndex, setCurrentIndex] = useState(0)
    
    const handleOnChange = (e:any) => {
        const files  = e.target.files
        let arr: Array<File> = []
        let arrNames: Array<string> = []

        for (var i = 0; i < files.length; i++) {
            arr.push(files[i])
            arrNames.push(files[i].name)
        }

        setSelectedFiles(arr)
    }

    return (
        <section className="flex flex-col items-center w-full gap-5">
            {/*Title*/}
            <div className="text-4xl font-bold">
                <h4>Gallery</h4>
            </div>

            {/*Gallery Header*/}
            <div className="border p-2 w-1/3 text-xl">
                <p>Select up to 10 images or videos showing off your new knife. Videos must be at max 1 minute in duration.</p>
            </div>

            {/*Files Display*/}
            <div className="w-3/5 border flex flex-col">
                <div className="w-full h-[500px] flex items-center justify-center">
                    {
                        selectedFiles
                        ?
                        <img src={URL.createObjectURL(selectedFiles[currentIndex])} className="w-full h-full object-cover" />
                        :
                        <h3 className="text-shadow text-3xl">No Files Selected</h3>
                    }
                </div>
                
                <div className="flex border-t p-2 justify-center">
                    <button type="button" onClick={() => filesInputRef.current?.click()} className="p-2 rounded-lg border text-xl bg-black">Select Files</button>
                </div>

                <div className="flex flex-wrap">
                    {
                        selectedFiles
                        ?
                        selectedFiles?.map((file, i) => {
                            return (
                                <div className="w-20 h-20" key={i}>
                                    <img src={URL.createObjectURL(file)} className="h-full w-full object-cover" onClick={() => setCurrentIndex(i)} />
                                </div>
                            )
                        })
                        : 
                        <></>
                    }
                </div>
            </div>

            <div>
                <input 
                type="file"
                ref={filesInputRef} 
                onChange={(e) => handleOnChange(e)}
                hidden
                multiple
                accept="jpeg, png, mov"
                />
            </div>
        </section>
    )
}

export default GalleryInput