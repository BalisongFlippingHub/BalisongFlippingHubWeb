import UserProfileData from "./UserProfileData";
import UserProfilePostsComponent from "./UserProfilePostsComponent";
import ProfileImage from "./profilePageComponents/ProfileImage";
import ProfileBannerImage from "./profilePageComponents/ProfileBannerImage";

const UserProfilePage = () => {
  return (
    <div className="w-full h-screen pt-[64px] lg:pl-[192px]">
      <section className="w-full h-[40%] border-b-4 border-b">
        {/*Banner*/}
        <ProfileBannerImage />

        {/*Profile Image*/}
        <ProfileImage />

        {/*Account Details*/}
        <UserProfileData />
      </section>

      <section className="flex justify-center bg-shadow-green w-full">
        <UserProfilePostsComponent />
      </section>
    </div>
  );
};

export default UserProfilePage;
