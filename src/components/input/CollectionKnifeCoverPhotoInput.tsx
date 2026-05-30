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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Cover Photo</label>

      <button
        type="button"
        onClick={() => coverPhotoInputRef.current?.click()}
        className="w-full xsm:h-[180px] sm:h-[220px] md:h-[263px] rounded-xl border border-dashed border-white/20 overflow-hidden bg-white/5 hover:border-blue-primary/50 hover:bg-white/[0.07] transition-colors duration-200 relative group"
      >
        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center gap-2 h-full text-white/30 group-hover:text-white/50 transition-colors duration-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">Upload cover photo</span>
            <span className="text-xs text-white/20">JPEG or PNG</span>
          </div>
        ) : (
          <>
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="text-white text-sm font-medium">Change Photo</span>
            </div>
          </>
        )}
      </button>

      <input
        type="file"
        value={selectedFileName}
        ref={coverPhotoInputRef}
        onChange={(e) => handleOnChange(e)}
        accept="image/jpeg, image/png"
        className="hidden"
      />
    </div>
  );
};

export default CollectionKnifeCoverPhotoInput;
