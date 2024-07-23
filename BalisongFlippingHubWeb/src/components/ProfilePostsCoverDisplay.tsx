import { Post } from "../modals/Post";
import ProfilePostCover from "./ProfilePostCover";

interface params {
    posts: Array<Post>
}

const ProfilePostsCoverDisplay = ({ posts }: params) => {

    return (
        <div className="w-full flex flex-wrap mt-5">
            {
                posts.map((post, i) => {
                    return (
                        <ProfilePostCover key={i} post={post} />
                    )
                })
            }
        </div>
    )
}

export default ProfilePostsCoverDisplay;