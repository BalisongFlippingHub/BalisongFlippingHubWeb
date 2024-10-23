import UserProfileData from "./profilePageComponents/UserProfileData";
import UserProfilePostsComponent from "./UserProfilePostsComponent";
import ProfileImage from "./profilePageComponents/ProfileImage";
import ProfileBannerImage from "./profilePageComponents/ProfileBannerImage";

const UserProfilePage = () => {
  return (
    <>
      <section className="w-full h-screen pt-[64px] lg:pl-[192px]">
        <div className="w-full md:h-[40%] xsm:h-[48%]  border-b">
          <div className="md:h-[45%] xsm:h-[38%] w-full">
            <ProfileBannerImage />
            <ProfileImage />
          </div>

          <div className="w-full md:h-[55%] xsm:h-[62%]">
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
