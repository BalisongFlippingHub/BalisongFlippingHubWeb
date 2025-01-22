import { Post } from "../modals/Post";

interface params {
  postObj: Post;
}

const ProfilePost = ({ postObj }: params) => {
  return (
    <div>
      <h3>{postObj.id}</h3>
    </div>
  );
};

export default ProfilePost;
