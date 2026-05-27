import { useEffect, useState } from "react";
import { axiosApiInstance } from "../../api/axios";
import { useAppSelector } from "../../redux/hooks";
import { CollectionTimelinePostModal } from "../../modals/Post";
import CollectionPost from "./CollectionPost";

const CollectionPostsDisplay = () => {
  const [posts, setPosts]         = useState<Array<CollectionTimelinePostModal> | null>(null);
  const [_isLoading, setIsLoading] = useState(false);

  const collectionData = useAppSelector((state) => state.collection.collection);

  const getPosts = async () => {
    setIsLoading(true);
    await axiosApiInstance
      .request({
        url: `/collection/any/${collectionData?.id}/get-posts`,
        method: "get",
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPosts();
  }, [collectionData]);

  return (
    <div className="xsm:w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col xsm:border-t md:border-t-0 md:border-l border-white/10 text-white">

      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10">
        <h3 className="text-white font-semibold text-base">Activity</h3>
        <p className="text-white/30 text-xs mt-0.5">Collection timeline</p>
      </div>

      {/* Posts or empty state */}
      <div className="flex flex-col gap-2 p-3 overflow-y-auto">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <CollectionPost post={post} key={post.id} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center xsm:py-6 md:py-12 gap-1">
            <p className="text-white/30 text-sm font-medium">No activity yet.</p>
            <p className="text-white/20 text-xs">Actions on your collection appear here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default CollectionPostsDisplay;
