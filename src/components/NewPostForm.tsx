import { ChangeEvent, useRef, useState } from "react";
import PostPreviewComponent from "./PostPreview";
import { CreationPostDTO, PostPreview } from "../modals/Post";
import NewPostImageDisplay from "./NewPostImageDisplay";
import ProfileImgDisplay from "./ProfileImgDisplay";
import { useAppSelector } from "../redux/hooks";

interface params {
  initiateCreatingLinkedPost?: Function;
  createPostObjDto?: Function;
  getPostObjFiles?: Function;
  createLinkedPostObjDto?: Function;
  getLinkedPostObjFiles?: Function;
  togglePostObjSet?: Function;
  toggleLinkedPostObjSet?: Function;
  allowTimerSet: boolean;
}

const NewPostForm = ({
  initiateCreatingLinkedPost,
  allowTimerSet,
  toggleLinkedPostObjSet,
  togglePostObjSet,
  createPostObjDto,
  createLinkedPostObjDto,
  getPostObjFiles,
  getLinkedPostObjFiles,
}: params) => {
  const captionRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const identifierRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [identifier, setIdentifier] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [currentFiles, setCurrentFiles] = useState("");
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [isPrivatePost, setIsPrivatePost] = useState(false);
  const [timerSet, setTimerSet] = useState(false);
  const [timerValue, setTimerValue] = useState("Not Set");

  const [filesAutoFocus, setFilesAutoFocus] = useState(true);

  const [alert, setAlert] = useState("");

  const [toggleImageDisplay, setToggleImageDisplay] = useState(false);
  const [togglePostPreview, setTogglePostPreview] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const identifierList = [
    "Sell/Trade",
    "Flipping",
    "Collection",
    "Show-Off",
    "Mod-Work",
  ];

  const captionOnlyIdentifierList = ["Inquiry", "GibbleGobble"];

  const handleChangeTag = (e: string) => {
    if (selectedFiles.length === 0) {
      if (!captionOnlyIdentifierList.includes(e)) {
        return;
      }

      setIdentifier(e);
      toggleFilesFocus();
    } else {
      if (!identifierList.includes(e)) {
        return;
      }

      setIdentifier(e);
      toggleFilesFocus();
    }
  };

  const handleAddImageClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (!files || selectedFiles.length > 12) {
      setCurrentFiles("");
      return;
    }

    const addFiles: File[] = [];
    var duplicateFound: boolean;

    for (var i = 0; i < files.length; i++) {
      duplicateFound = false;
      for (var j = 0; j < selectedFiles.length; j++) {
        if (
          selectedFiles[j].name === files[i].name &&
          selectedFiles[j].size === files[i].size &&
          selectedFiles[j].type === files[i].type
        ) {
          duplicateFound = true;
          break;
        }
      }

      if (!duplicateFound && selectedFiles.length + addFiles.length + 1 != 13) {
        if (timerSet) {
          if (addFiles.length === 1) {
            setAlert(
              "A post with a set timer can only have 1 image or video selected."
            );
            return;
          }
        }
        addFiles.push(files[i]);
      }
    }

    setSelectedFiles((prev) => [...prev, ...addFiles]);

    if (!toggleImageDisplay) {
      if (selectedFiles.length > 0) setToggleImageDisplay(true);
    }

    if (identifier !== "") {
      setIdentifier("");
    }

    if (alert !== "") setAlert("");

    setCurrentFiles("");
  };

  const deleteSelectedFile = (index: number) => {
    setSelectedFiles((prev) =>
      prev.filter((_file, i) => {
        return index !== i;
      })
    );

    if (selectedFiles.length === 1) {
      if (identifier !== "") {
        setIdentifier("");
      }

      if (description !== "") {
        setDescription("");
      }
    }
  };

  const togglePreview = () => {
    if (selectedFiles.length === 0) {
      if (caption.trim() === "") {
        setAlert("*Post must have a caption if no images/videos selected");
        captionRef.current?.focus();
        return;
      }
    }

    if (allowTimerSet) {
      if (togglePostObjSet) {
        togglePostObjSet();
        if (createPostObjDto) {
          if (togglePostPreview) {
            createPostObjDto(null);
            if (getPostObjFiles) getPostObjFiles(null);
          } else {
            createPostObjDto(createPostDto);
            if (getPostObjFiles) getPostObjFiles(selectedFiles);
          }
        }
      }
    } else {
      if (toggleLinkedPostObjSet) {
        toggleLinkedPostObjSet();
        if (createLinkedPostObjDto) {
          if (togglePostPreview) {
            createLinkedPostObjDto(null);
            if (getLinkedPostObjFiles) getLinkedPostObjFiles(null);
          } else {
            createLinkedPostObjDto(createPostDto);
            if (getLinkedPostObjFiles) getLinkedPostObjFiles(selectedFiles);
          }
        }
      }
    }

    setTogglePostPreview((prev) => !prev);
  };

  const handleSetTimerClick = () => {
    if (timerSet) {
      setTimerValue("Not Set");
      setTimerSet((prev) => !prev);
    } else {
      setTimerValue("24");
      setTimerSet((prev) => !prev);

      if (selectedFiles.length > 1) {
        setSelectedFiles([]);
        setAlert("Post set with timer can only have 1 image or video.");
      }
    }

    if (initiateCreatingLinkedPost) {
      initiateCreatingLinkedPost();
    }
  };

  const setCaptionOnChange = (e: string) => {
    if (alert !== "") {
      setAlert("");
    }

    if (e.length > 255) {
      return;
    }

    setCaption(e);
  };

  const createPostDto = () => {
    return {
      caption: caption,
      description: description,
      creatorId: user?.id,
      identifier: identifier,
      isPrivatePost: isPrivatePost,
      isAnnouncement: isAnnouncement,
      hasTimer: timerSet,
      timerInHours: timerValue,
    } as CreationPostDTO;
  };

  const createPostPreview = () => {
    if (user?.role === "USER") {
      return {
        id: "1",
        caption: caption,
        description: description,
        creatorName: user?.displayName,
        creatorProfileImg: user?.profileImg,
        creationDate: "Now",
        files: selectedFiles,
        likes: 0,
        identifer: identifier,
        isAnnouncement: isAnnouncement,
        isPrivatePost: isPrivatePost,
        hasTimer: timerSet,
        timeInHours: timerValue,
      } as PostPreview;
    } else {
      return {
        id: "1",
        caption: caption,
        description: description,
        creatorName: "ADMIN",
        creatorProfileImg: null,
        creationDate: "Now",
        files: selectedFiles,
        likes: 0,
        identifer: identifier,
        isAnnouncement: isAnnouncement,
        isPrivatePost: isPrivatePost,
        hasTimer: timerSet,
        timeInHours: timerValue,
      } as PostPreview;
    }
  };

  const captionMouseLeave = () => {
    if (document.activeElement !== captionRef.current) {
      toggleFilesFocus();
    }
  };

  const captionMouseEnter = () => {
    if (document.activeElement !== captionRef.current) {
      toggleFilesFocus();
    }
  };

  const descriptionMouseLeave = () => {
    if (document.activeElement !== descriptionRef.current) {
      toggleFilesFocus();
    }
  };

  const descriptionMouseEnter = () => {
    toggleFilesFocus();
  };

  const identifierMouseLeave = () => {
    if (document.activeElement !== identifierRef.current) {
      toggleFilesFocus();
    }
  };

  const identifierMouseEnter = () => {
    if (document.activeElement !== captionRef.current) {
      if (filesAutoFocus) {
        toggleFilesFocus();
      }
    }
  };

  const toggleFilesFocus = () => {
    setFilesAutoFocus((prev) => !prev);
  };

  if (togglePostPreview) {
    return (
      <div className="flex flex-col">
        <PostPreviewComponent postObj={createPostPreview()} />
        <div className="m-auto mt-10 text-lg">
          <button
            className="rounded border p-2"
            type="button"
            onClick={togglePreview}
          >
            Edit Post
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <form className="w-2/3 bg-shadow-green border-4 border-shadow-green-offset rounded-lg flex flex-col items-center m-auto">
        <div className="w-full p-2 flex justify-between border-b-2 border-shadow-green-offset">
          {/*Identifier Tag*/}
          {identifier === "" ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Add Tag +"
                list="tag-list"
                ref={identifierRef}
                className="w-28 h-12 bg-shadow-green-offset border border-white rounded-lg text-black p-2"
                onChange={(e) => handleChangeTag(e.target.value)}
                onMouseEnter={identifierMouseEnter}
                onMouseLeave={identifierMouseLeave}
                onBlur={toggleFilesFocus}
              />
              {selectedFiles.length !== 0 ? (
                <datalist id="tag-list">
                  {identifierList.map((identifier, i) => (
                    <option key={i}>{identifier}</option>
                  ))}
                </datalist>
              ) : (
                <datalist id="tag-list">
                  {captionOnlyIdentifierList.map((identifer, i) => (
                    <option key={i}>{identifer}</option>
                  ))}
                </datalist>
              )}
              {alert === "" ? (
                <></>
              ) : (
                <h4 className="bg-inherit text-red-400 text-lg p-2">{alert}</h4>
              )}
            </div>
          ) : (
            <div className="flex p-2 rounded-full bg-shadow-green-offset items-center">
              <p className="mr-2 font-bold">{identifier}</p>
              <button
                className="text-sm hover:text-lg"
                type="button"
                onClick={() => setIdentifier("")}
              >
                x
              </button>
            </div>
          )}

          {/*File Input field*/}
          <input
            type="file"
            ref={fileRef}
            multiple
            className="collapse"
            accept=".png,.jpg"
            value={currentFiles}
            onChange={(e) => handleFileChange(e)}
          />

          {/*Profile Img Display*/}
          <div className="rounded-full border w-12 h-12 overflow-hidden">
            <ProfileImgDisplay imgStr={user?.profileImg} />
          </div>
        </div>

        {/*Text Area for post caption*/}
        <textarea
          className="h-20 w-full bg-shadow-green-offset p-2 text-xl"
          placeholder="Add a caption..."
          ref={captionRef}
          value={caption}
          onChange={(e) => setCaptionOnChange(e.target.value)}
          onMouseEnter={captionMouseEnter}
          onMouseLeave={captionMouseLeave}
          onBlur={toggleFilesFocus}
        />

        {/*Display of selected files*/}
        {
          <NewPostImageDisplay
            files={selectedFiles}
            deleteSelectedFile={deleteSelectedFile}
            filesAutoFocus={filesAutoFocus}
          />
        }

        {selectedFiles.length > 0 ? (
          <textarea
            className="h-20 w-full text-shadow bg-shadow-green-offset p-2 border-b border-t border-black"
            placeholder="Add a description..."
            value={description}
            ref={descriptionRef}
            onChange={(e) => setDescription(e.target.value)}
            onMouseEnter={descriptionMouseEnter}
            onMouseLeave={descriptionMouseLeave}
            onBlur={toggleFilesFocus}
          />
        ) : (
          <></>
        )}

        <div className="w-full justify-around flex p-2 items-center">
          <button
            className="w-30 bg-black rounded p-2"
            type="button"
            onClick={handleAddImageClick}
          >
            Add Image/Video
          </button>
          <button
            className="w-30 bg-black rounded p-2"
            type="button"
            onClick={togglePreview}
          >
            Add Post
          </button>
          <div className="flex flex-col text-lg p-1">
            {isPrivatePost ? (
              <div className="">
                <input
                  type="checkbox"
                  className=""
                  checked
                  onChange={() => setIsPrivatePost((prev) => !prev)}
                />
                <label className="bg-inherit font-bold ml-2">
                  Private Post
                </label>
              </div>
            ) : (
              <div className="">
                <input
                  type="checkbox"
                  className=""
                  onChange={() => setIsPrivatePost((prev) => !prev)}
                />
                <label className="bg-inherit font-bold ml-2">
                  Private Post
                </label>
              </div>
            )}

            {allowTimerSet ? (
              <>
                {timerSet ? (
                  <div className="bg-inherit">
                    <input
                      type="checkbox"
                      checked
                      onClick={handleSetTimerClick}
                    />
                    <label className="bg-inherit font-bold ml-2">
                      Set Timer
                    </label>
                  </div>
                ) : (
                  <div className="bg-inherit">
                    <input type="checkbox" onClick={handleSetTimerClick} />
                    <label className="bg-inherit font-bold ml-2">
                      Set Timer
                    </label>
                  </div>
                )}

                {!timerSet ? (
                  <></>
                ) : (
                  <div className="bg-inherit">
                    <input
                      type="range"
                      min="24"
                      max="168"
                      value={timerValue}
                      onChange={(e) => setTimerValue(e.target.value)}
                    />
                    <label className="bg-inherit font-bold ml-2">
                      Hours: {timerValue}
                    </label>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}

            {user?.role === "USER" ? (
              <></>
            ) : (
              <div className="bg-inherit">
                <input
                  type="checkbox"
                  className=""
                  onChange={() => setIsAnnouncement((prev) => !prev)}
                />
                <label className="bg-inherit font-bold ml-2">
                  Set As annoucement
                </label>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }
};

export default NewPostForm;
