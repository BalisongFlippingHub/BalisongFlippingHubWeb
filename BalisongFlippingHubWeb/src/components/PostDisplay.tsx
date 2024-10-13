import { useEffect, useState } from "react";
import { Post } from "../modals/Post";
import { axiosApiInstanceAuth } from "../api/axios";
import ProfileImgDisplay from "./ProfileImgDisplay";
import PostFilesDisplay from "./PostFilesDisplay";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface params {
  postId?: string;
  post?: Post;
  isNewlyCreatedPost: boolean;
}

const PostDisplay = ({ postId, post, isNewlyCreatedPost }: params) => {
  const [postData, setPostData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navigateToUsersPage = () => {
    if (postData?.creatorId === user?.id) {
      navigate("/me");
    } else {
      navigate("/me");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (!post) {
      // load post data from api
      const getPostData = async () => {
        await axiosApiInstanceAuth
          .request({
            url: `/posts/any/${postId}`,
            method: "get",
          })
          .then((res) => {
            // upon success
            console.log(res);

            // set post data
            console.log("setting post data");
            setPostData(res.data);
          })
          .catch((err) => {
            // failed to post new post to db
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };

      getPostData();
    } else {
      setPostData(post);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div
        className={
          postData?.isAnnouncement
            ? "m-auto w-3/5 flex flex-col rounded-lg mt-5 mb-5 border border-gold border-4"
            : postData?.isPrivate
            ? "m-auto w-3/5 flex flex-col rounded-lg mt-5 mb-5 border border-shadow border-4"
            : "m-auto w-3/5 flex flex-col rounded-lg mt-5 mb-5 border border-shadow-green-offset border-4"
        }
      >
        <div className="flex justify-between p-2 border-b-2 border-shadow-green-offset">
          {/*Profile Data and post manipulation*/}
          <div className="flex">
            <div
              className="rounded-full w-12 h-12 overflow-hidden hover:cursor-pointer"
              onClick={navigateToUsersPage}
            >
              <ProfileImgDisplay imgStr={postData?.creatorProfileImg} />
            </div>
            <div className="ml-2">
              <h3
                className="text-2xl hover:cursor-pointer"
                onClick={navigateToUsersPage}
              >
                {postData?.creatorName}
              </h3>
              <h5 className="text-sm text-shadow">Now</h5>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between">
            {postData?.isAnnouncement && postData?.isPrivate ? (
              <div className="text-lg">
                <h3 className="text-shadow">Private Annoucement</h3>
              </div>
            ) : postData?.isAnnouncement ? (
              <div className="text-lg">
                <h3 className="text-shadow">Announcement</h3>
              </div>
            ) : postData?.isPrivate ? (
              <div className="text-lg">
                <h3 className="text-shadow">Private</h3>
              </div>
            ) : (
              <div>
                <h3 className="invisible">fill</h3>
              </div>
            )}

            <div className="flex place-self-end items-center">
              <div className="flex flex-col">
                <span className="bg-white h-1 w-1 mb-1"></span>
                <span className="bg-white h-1 w-1 mb-1"></span>
                <span className="bg-white h-1 w-1"></span>
              </div>
            </div>
          </div>
        </div>

        {/*Post Caption And Identifier Display*/}
        <div className="flex flex-col">
          {postData?.identifier === "" ? (
            <></>
          ) : (
            <div className="flex mb-1 p-2">
              <h3 className="bg-shadow-green-offset p-2 rounded-full">
                {postData?.identifier}
              </h3>
            </div>
          )}

          {postData?.caption === "" ? (
            <></>
          ) : (
            <div className="p-2">
              <p className="text-2xl">{postData?.caption}</p>
            </div>
          )}
        </div>

        {/*Display Files*/}
        {postData?.files.length !== 0 ? (
          <PostFilesDisplay filesStr={postData?.files} />
        ) : (
          <></>
        )}

        <div className="flex justify-between bg-shadow-green-offset p-2">
          {/*Post Interactivity*/}
          <div className="flex">
            <div className="w-7 h-7 rounded-full bg-white mr-2 flex justify-center items-center font-bold">
              <h5 className="text-black">H</h5>
            </div>

            <div className="w-7 h-7 rounded-full bg-white mr-2 flex justify-center items-center font-bold">
              <h5 className="text-black">C</h5>
            </div>
          </div>

          <div>
            <div className="w-7 h-7 rounded-full bg-white mr-2 flex justify-center items-center font-bold">
              <h5 className="text-black">S</h5>
            </div>
          </div>
        </div>

        {/*Display Description*/}
        <div className="flex p-2 flex-col border-t-4 border-shadow-green">
          <div className="flex mb-2">
            <p className="mr-3 text-shadow">{postData?.likes} likes</p>
            <p className="text-shadow">0 comments</p>
          </div>

          <div className="">
            {postData?.description !== "" ? (
              <>
                <p className="text-shadow">description...</p>
                <p className="text-shadow">{postData?.description}</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/*Comments Component*/}
      </div>
    );
  }
};

export default PostDisplay;
