import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import PostDisplay from "../components/PostDisplay";

const CommunityPage = () => {

    const { newlyCreatedPost, setNewlyCreatedPost } = useAuth()

    useEffect(() => {
        

        return (() => {
            // setNewlyCreatedPost("")
        })
    },[]) 

    return (
        <section className="flex flex-col items-center">
            {/*Display Newly Created Post if there is one*/}
            {
                newlyCreatedPost !== ""
                ?
                <div className="w-full bg-shadow-offset">
                    <PostDisplay postId={newlyCreatedPost} isNewlyCreatedPost={true} />
                </div>
                :
                <></>
            }

            {/*Display Latest Posts*/}
            {

            }
        </section>
    )
}

export default CommunityPage;