import ProfileBanner from "./ProfileBanner";
import ProfileImg from "./ProfileImg";
import ProfileData from "./ProfileData";
import UserProfilePostComponent from "./UserProfilePostComponent";

const UserProfilePage = () => {
     
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

            <section className="flex justify-center">
                <UserProfilePostComponent />
            </section>
        </>
    )
}

export default UserProfilePage;

// Comed Account #- 7687640017     7687640017

