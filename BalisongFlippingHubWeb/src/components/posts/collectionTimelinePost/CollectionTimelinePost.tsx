import { CollectionTimelinePostModal } from "../../../modals/Post";
import CollectionTimelineCaption from "./CollectionTimelineCaption";
import CollectionTimelineFilesDisplay from "./CollectionTimelineFilesDisplay";

interface params {
  post: CollectionTimelinePostModal;
}

const CollectionTimelinePost = ({ post }: params) => {
  const getTag = (tag: string, key: number) => {
    switch (tag) {
      case "NEW_KNIFE":
        return (
          <div
            key={key}
            className="pr-2 pl-2 pt-1 pb-1 border rounded-full bg-red font-semibold"
          >
            <p>New Knife</p>
          </div>
        );
      case "GRAIL":
        return (
          <div
            key={key}
            className="pr-2 pl-2 pt-1 pb-1 border rounded-full bg-gold font-semibold"
          >
            <p>Grail</p>
          </div>
        );
      case "FAV_FLIPPER":
        return (
          <div
            key={key}
            className="pr-2 pl-2 pt-1 pb-1 border rounded-full bg-shadow font-semibold"
          >
            <p>Fav Flipper</p>
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <div className="w-full bg-shadow-green-offset rounded-lg border-black border-2">
      {/*Tags display*/}
      <div className="bg-black p-2 text-shadow border-b border-b">
        <p>{post.postType}</p>
      </div>

      <div className="w-full bg-black flex flex-wrap gap-3 p-2 items-center">
        <p className="text-shadow">Tags:</p>
        {post.postTags.map((tag, i) => {
          return getTag(tag, i);
        })}
      </div>

      {/*Timeline Caption*/}
      <CollectionTimelineCaption
        knifeDisplayName={post.collectionKnifeDisplayName}
      />

      {/*Cover Photo and files display*/}
      <CollectionTimelineFilesDisplay
        files={[...post.galleryFiles, post.collectionKnifeCoverPhoto].reverse()}
      />

      {/*Timestamp*/}
      <div className="w-full flex justify-center bg-black">
        <p>{post.creationDate}</p>
      </div>
    </div>
  );
};

export default CollectionTimelinePost;
