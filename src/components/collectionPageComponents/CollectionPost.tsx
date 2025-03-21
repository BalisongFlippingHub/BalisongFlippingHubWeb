import { CollectionTimelinePostModal } from "../../modals/Post";
import CollectionTimelinePost from "../posts/collectionTimelinePost/CollectionTimelinePost";

interface params {
  post: CollectionTimelinePostModal;
}

const CollectionPost = ({ post }: params) => {
  if (post.postType === "COLLECTION_TIMELINE") {
    return <CollectionTimelinePost post={post} />;
  } else {
    return <div>{post.postType}</div>;
  }
};

export default CollectionPost;
