import ProfileBanner from "./ProfileBanner";
import CustomProfileImg from "./CustomProfileImg";
import ProfileData from "./ProfileData";
import UserProfilePostsComponent from "./UserProfilePostsComponent";

const UserProfilePage = () => {
     
    return (
        <>
            <section className="text-lg font-semibold border-b h-2/5 flex flex-col justify-between">
                {/*Account Info*/}
                <div className="w-full h-2/3 flex flex-col items-center">
                    <ProfileBanner />
                    <CustomProfileImg />
                </div>
                <ProfileData />
            </section>

            <section className="flex justify-center bg-shadow-green">
                <UserProfilePostsComponent />
            </section>
        </>
    )
}

export default UserProfilePage;

