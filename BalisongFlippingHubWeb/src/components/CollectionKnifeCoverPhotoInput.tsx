import { useEffect, useRef, useState } from "react";

interface params {
  setCoverFileOnChange: Function;
  parentCoverFile: File | null;
}

const CollectionKnifeCoverPhotoInput = ({
  setCoverFileOnChange,
  parentCoverFile,
}: params) => {
  const coverPhotoInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(
    parentCoverFile
  );
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleOnChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setCoverFileOnChange(e.target.files[0]);
    setSelectedFileName(e.target.value);
  };

  useEffect(() => {
    setSelectedFile(parentCoverFile);
  }, [parentCoverFile]);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-72 w-72 rounded-lg border-2 border-black overflow-hidden mt-5 bg-shadow-green">
        {!selectedFile ? (
          <button
            type="button"
            className="w-full h-full flex items-center justify-center text-lg font-bold"
            onClick={() => coverPhotoInputRef.current?.click()}
          >
            Cover Photo +
          </button>
        ) : (
          <div className="w-full h-full relative">
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-cover hover:blur hover:cursor-pointer"
              onClick={() => coverPhotoInputRef.current?.click()}
            />
          </div>
        )}
      </div>
      <input
        type="file"
        value={selectedFileName}
        ref={coverPhotoInputRef}
        onChange={(e) => handleOnChange(e)}
        accept="jpeg, png"
        className=""
      />
    </div>
  );
};

export default CollectionKnifeCoverPhotoInput;
