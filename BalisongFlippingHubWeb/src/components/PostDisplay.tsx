import { Post } from "../modals/Post";

interface params {
    postObj: Post
}

const PostDisplay = ({ postObj }: params) => {

    return (
        <div className="w-2/3">
            <h1>Fill</h1>
        </div>
    )
}

export default PostDisplay; 