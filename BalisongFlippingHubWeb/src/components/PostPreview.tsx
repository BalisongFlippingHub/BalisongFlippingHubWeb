import { PostPreview } from "../modals/Post";

type params = {
    postObj: PostPreview
}

const PostPreviewComponent = ({ postObj }: params) => {

    return (
        <div className="w-2/3 flex flex-col m-auto">
            <div className="bg-slate-300 rounded border">
                <div className="w-full border-b border-black bg-inherit p-1 flex justify-between bg-slate-300">
                    {/*Identifier and profile img*/}
                    {
                        postObj.identifer === ""
                        ?
                        <h3></h3>
                        :
                        <h3 className="rounded-full p-2">{postObj.identifer}</h3>
                    }
                    <h3 className="rounded-full p-2">Profile</h3>
                </div>
                {
                    postObj.caption === ""
                    ?
                    <></>
                    :
                    <div className="w-full h-20 bg-slate-300">
                        {/*Caption*/}
                        <p className="bg-inherit p-2 text-black text-xl font-bold">{postObj.caption}</p>
                    </div>
                }
                {
                    postObj.files.length === 0
                    ?
                    <></>
                    :
                    <div className="flex overflow-hidden w-full h-80">
                        {/*Display of images*/}
                        {
                            postObj.files.map((file, i) => {
                                return (
                                    <img key={i} src={URL.createObjectURL(file)} className="object-cover w-full h-full" />
                                )
                            })
                        }
                    </div>
                }
                <div className="w-full bg-slate-300 flex border-b border-t border-black">
                    {/*Display of likes and relevant data*/}
                    <p className="bg-inherit text-black">Likes: {postObj.likes}</p>
                </div>
                <div className="bg-slate-300 flex w-full">
                    {/*Description*/}
                    <p className="bg-slate-300 text-black p-1">{postObj.description}</p>
                </div>
                <div className="border">
                    {/*Comments*/}
                </div>

                <div>
                    <button>Edit Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostPreviewComponent; 