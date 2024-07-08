import { PostPreview } from "../modals/Post";

type params = {
    postObj: PostPreview
}

const PostPreviewComponent = ({ postObj }: params) => {

    return (
        <div className="w-2/3">
            <div className="flex justify-between">
                <h3>{postObj.identifer}</h3>
                <h3>Profile</h3>
            </div>
        </div>
    )
}

export default PostPreviewComponent; 