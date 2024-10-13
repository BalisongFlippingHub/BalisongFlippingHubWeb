import { useState } from "react";
import NewPostForm from "../components/NewPostForm";
import { CreationPostDTO } from "../modals/Post";
import { axiosApiInstanceAuth } from "../api/axios";
import { Profile } from "../modals/User";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const CreatePostPage = () => {
  const [creatingLinkedPost, setCreatingLinkedPost] = useState(false);

  const [postObjSet, setPostObjSet] = useState(false);
  const [linkedPostObjSet, setLinkedPostObjSet] = useState(false);

  const [postObj, setPostObj] = useState<CreationPostDTO | null>(null);
  const [postObjFiles, setPostObjFiles] = useState<Array<File> | null>(null);

  const [linkedPostObj, setLinkedPostObj] = useState<CreationPostDTO | null>(
    null
  );
  const [linkedPostObjFiles, setLinkedPostObjFiles] =
    useState<Array<File> | null>(null);

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.accessToken);

  const navigate = useNavigate();

  const initiateCreatingLinkedPost = () => {
    setCreatingLinkedPost((prev) => !prev);
  };

  const togglePostObjSet = () => {
    setPostObjSet((prev) => !prev);
  };

  const toggleLinkedPostObjSet = () => {
    setLinkedPostObjSet((prev) => !prev);
  };

  const createPostObjDto = (postObj: CreationPostDTO) => {
    setPostObj(postObj);
  };

  const getPostObjFiles = (files: Array<File>) => {
    setPostObjFiles(files);
  };

  const createLinkedPostObjDto = (postObj: CreationPostDTO) => {
    setLinkedPostObj(postObj);
  };

  const getLinkedPostObjFiles = (files: Array<File>) => {
    setLinkedPostObjFiles(files);
  };

  const sendLinkedPosts = async () => {
    if (postObj && linkedPostObj) {
      // create form data
      const fd = new FormData();

      // append data of first post with timer
      fd.append("caption", postObj.caption);
      fd.append("description", postObj.description);
      fd.append("identifier", postObj.identifier);
      fd.append("creatorId", postObj.creatorId);
      fd.append("isPrivatePost", JSON.stringify(postObj.isPrivatePost));
      fd.append("isAnnouncement", JSON.stringify(postObj.isAnnouncement));
      fd.append("hasTimer", JSON.stringify(postObj.hasTimer));
      fd.append("timerValue", postObj.timerInHours);

      // append data of second post meant to replace first
      fd.append("caption2", linkedPostObj.caption);
      fd.append("description2", linkedPostObj.description);
      fd.append("identifier2", linkedPostObj.identifier);
      fd.append("creatorId2", linkedPostObj.creatorId);
      fd.append("isPrivatePost2", JSON.stringify(linkedPostObj.isPrivatePost));
      fd.append(
        "isAnnouncement2",
        JSON.stringify(linkedPostObj.isAnnouncement)
      );
      fd.append("hasTimer2", JSON.stringify(false));

      // append connected files for first post
      postObjFiles?.forEach((file, _i) => {
        fd.append("files", file);
      });

      // append connected files for second post
      linkedPostObjFiles?.forEach((file, _i) => {
        fd.append("files2", file);
      });

      // post to api
      await axiosApiInstanceAuth
        .request({
          url: "/posts/create-linked-post",
          method: "post",
          data: fd,
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // upon success
          console.log(res);
        })
        .catch((err) => {
          // failed to post new post to db
          console.log(err);
        })
        .finally(() => {});
    }
  };

  const sendPost = async () => {
    if (postObj) {
      // create and append form data for new post
      const fd = new FormData();

      fd.append("caption", postObj.caption);
      fd.append("description", postObj.description);
      fd.append("identifier", postObj.identifier);
      fd.append("creatorId", postObj.creatorId);
      fd.append("isPrivatePost", JSON.stringify(postObj.isPrivatePost));
      fd.append("isAnnouncement", JSON.stringify(postObj.isAnnouncement));
      fd.append("hasTimer", JSON.stringify(false));

      // append files
      postObjFiles?.forEach((file, _i) => {
        fd.append("files", file);
      });
    }
  };

  return (
    <section className="flex flex-col">
      <div className="m-auto text-xl mt-10 mb-10 flex flex-col w-full items-center">
        <h2>Create New Post</h2>
        <span className="h-2 bg-black w-5/6 mt-2 rounded-full"></span>
      </div>
      <div
        className={
          postObjSet
            ? "border border-green ml-10 mr-10 pt-10 pb-10"
            : "border border-none ml-10 mr-10 pt-10 pb-10"
        }
      >
        {postObjSet ? (
          <div className="absolute p-2 rounded border ml-10 bg-green">
            <h3 className="bg-inherit">Set</h3>
          </div>
        ) : (
          <div className="absolute p-2 rounded border ml-10 bg-red">
            <h3 className="bg-inherit">Not Set</h3>
          </div>
        )}
        <NewPostForm
          initiateCreatingLinkedPost={initiateCreatingLinkedPost}
          allowTimerSet={true}
          togglePostObjSet={togglePostObjSet}
          createPostObjDto={createPostObjDto}
          getPostObjFiles={getPostObjFiles}
        />
      </div>

      {creatingLinkedPost ? (
        <div className="">
          <div className="flex flex-col">
            <span className="m-auto w-1 h-32 bg-black mt-5 mb-5"></span>
            <h3 className="m-auto mb-2 text-xl">Linked Post</h3>
            <span className="h-1 bg-black w-5/6 mt-2 rounded-full mb-5 m-auto"></span>
          </div>

          {linkedPostObjSet ? (
            <div className="absolute p-2 rounded border ml-10 bg-green">
              <h3 className="bg-inherit">Set</h3>
            </div>
          ) : (
            <div className="absolute p-2 rounded border ml-10 bg-red">
              <h3 className="bg-inherit">Not Set</h3>
            </div>
          )}

          <NewPostForm
            allowTimerSet={false}
            toggleLinkedPostObjSet={toggleLinkedPostObjSet}
            createLinkedPostObjDto={createLinkedPostObjDto}
            getLinkedPostObjFiles={getLinkedPostObjFiles}
          />
          <span className="h-1 bg-black w-5/6 mt-2 rounded-full m-auto"></span>
        </div>
      ) : (
        <></>
      )}

      {creatingLinkedPost ? (
        postObjSet && linkedPostObjSet ? (
          <div className="m-auto mt-5">
            <button
              className="p-2 rounded bg-shadow-green-offset text-xl"
              type="button"
              onClick={sendLinkedPosts}
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className="m-auto mt-5">
            <button
              className="p-2 rounded bg-black text-xl "
              type="button"
              disabled
            >
              Create Post
            </button>
          </div>
        )
      ) : postObjSet ? (
        <div className="m-auto mt-5">
          <button
            className="p-2 rounded bg-shadow-green-offset text-xl"
            type="button"
            onClick={sendPost}
          >
            Create Post
          </button>
        </div>
      ) : (
        <div className="m-auto mt-5">
          <button
            className="p-2 rounded bg-black text-xl "
            type="button"
            disabled
          >
            Create Post
          </button>
        </div>
      )}
    </section>
  );
};

export default CreatePostPage;
