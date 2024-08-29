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
        <section className="flex flex-col items-center w-full h-full gap-3">
            {/*Title*/}
            <div className="text-4xl font-bold">
                <h4>Gallery</h4>
            </div>

            
            {/*Files Display*/}
            <div className="flex w-full">
                <input 
                    type="file"
                    ref={filesInputRef} 
                    onChange={(e) => handleOnChange(e)}
                    hidden
                    multiple
                    accept="jpeg, png, mov"
                />

                <div className="flex items-center justify-center w-1/2 h-96 border">
                    {
                        selectedFiles
                        ?
                        <img src={URL.createObjectURL(selectedFiles[currentIndex])} className="w-full h-full object-cover" />
                        :
                        <h3 className="text-shadow text-3xl">No Files Selected</h3>
                    }
                </div>

                <div className="flex flex-col w-1/2 border border">
                    <div className="flex justify-center">
                        <button type="button" className="p-2 bg-black mt-2" onClick={() => filesInputRef.current?.click()}>Select Files</button>
                    </div>

                    {
                        selectedFiles
                        ?
                        <div className="flex flex-wrap">
                        {
                            selectedFiles?.map((file, i) => {
                                return (
                                    <div className="w-36 h-36" key={i}>
                                        <img src={URL.createObjectURL(file)} className="h-full w-full object-cover" onClick={() => setCurrentIndex(i)} />
                                    </div>
                                )
                            })
                        }
                        </div>
                        : 
                        <></>
                    }
                </div>
            </div>
        </section>
    )
}

export default GalleryInput