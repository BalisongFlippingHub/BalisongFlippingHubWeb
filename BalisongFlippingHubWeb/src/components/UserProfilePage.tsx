import ProfileBanner from "./ProfileBanner";
import ProfileImg from "./ProfileImg";
import ProfileData from "./ProfileData";
import useAuth from "../hooks/useAuth";
import ProfilePost from "./ProfilePost";

const UserProfilePage = () => {
    const { user } = useAuth();
     
    return (
        <>
            <section className="text-lg font-semibold border-b h-2/5 flex flex-col justify-between">
                {/*Account Info*/}
                <div className="w-full h-2/3 flex flex-col items-center">
                    <ProfileBanner />
                    <ProfileImg />
                </div>
                <ProfileData />
            </section>

            <section className="flex flex-col justify-center pt-10">
                <div className="flex w-full justify-center">
                    {/*Profile Navigation*/}

                </div>
                <div className="">
                    {/*Display of Posts*/}
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

// Comed Account #- 7687640017     7687640017

