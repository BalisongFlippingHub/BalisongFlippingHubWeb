import UserProfileData from "./profilePageComponents/UserProfileData";
import UserProfilePostsComponent from "./UserProfilePostsComponent";
import ProfileImage from "./profilePageComponents/ProfileImage";
import ProfileBannerImage from "./profilePageComponents/ProfileBannerImage";

const UserProfilePage = () => {
  return (
    <>
      <section className="w-full h-screen pt-[64px] lg:pl-[192px]">
        <div className="w-full h-[40%] border-b">
          <div className="h-[45%] w-full">
            <ProfileBannerImage />
            <ProfileImage />
          </div>

          <div className="w-full h-[55%]">
            <UserProfileData />
          </div>
        </div>

        <div>
          <UserProfilePostsComponent />
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
