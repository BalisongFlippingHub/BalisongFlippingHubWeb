import { useEffect, useState } from "react";
import { axiosApiInstance } from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { CollectionTimelinePostModal } from "../../modals/Post";
import CollectionPost from "./CollectionPost";

const CollectionPostsDisplay = () => {
  const [posts, setPosts] = useState<Array<CollectionTimelinePostModal> | null>(
    null
  );
  const [_isLoading, setIsLoading] = useState(false);

  const collectionData = useAppSelector((state) => state.collection.collection);

  const getPosts = async () => {
    setIsLoading(true);
    await axiosApiInstance
      .request({
        url: `/collection/any/${collectionData?.id}/get-posts`,
        method: "get",
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, [collectionData]);

  return (
    <div className="w-1/3 h-full flex flex-col gap-2 p-2 overflow-y-scroll">
      {posts?.map((post, _i) => {
        return <CollectionPost post={post} key={post.id} />;
      })}
    </div>
  );
};

export default CollectionPostsDisplay;
