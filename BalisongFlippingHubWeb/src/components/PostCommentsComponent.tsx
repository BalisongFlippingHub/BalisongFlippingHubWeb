
interface params {
    postComments?: Array<string>
}

const PostCommentsComponent = ({ postComments }: params) => {
    return (
        <div className="w-full">    
            <div className="h-10">
                <h2>Comments</h2>
            </div>
        </div>
    )
}

export default PostCommentsComponent;