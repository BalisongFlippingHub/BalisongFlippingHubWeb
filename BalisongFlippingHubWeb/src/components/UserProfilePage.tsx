import ProfileBanner from "./ProfileBanner";
import ProfileImg from "./ProfileImg";
import ProfileData from "./ProfileData";
import useAuth from "../hooks/useAuth";
import ProfilePost from "./ProfilePost";

const UserProfilePage = () => {
    const { user } = useAuth();
     
    return (
        <>
            <section className="text-lg font-semibold border-b">
                {/*Account Info*/}
                <ProfileBanner />
                <div className="p-4 flex justify-between">
                    <div className="flex">   
                        <ProfileImg />
                        <ProfileData />
                    </div>
                    <div className="place-self-end">
                        <button type="button" className="bg-teal-700 p-2 rounded hover:cursor-pointer hover:bg-teal-600" >Configure Profile</button>
                    </div>
                </div>
            </section>

            <section className="flex">
                <div>
                    
                </div>
                <div className="">
                    {
                        user?.posts.map((post) => {
                            return <ProfilePost postObj={post} key={post.uuid} />
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default UserProfilePage;

// Comed Account #- 7687640017

