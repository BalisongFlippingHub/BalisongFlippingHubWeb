import UserProfileData from "./UserProfileData";
import UserProfilePostsComponent from "../UserProfilePostsComponent";
import UserProfileBanner from "./UserProfileBanner";
import UserProfileImage from "./UserProfileImage";

const UserProfilePage = () => {
  return (
    <>
      <section className="w-full h-screen pt-[64px] lg:pl-[192px]">
        <div className="w-full md:h-[40%] xsm:h-[48%]  border-b">
          <div className="md:h-[45%] xsm:h-[38%] w-full">
            <UserProfileBanner />
            <UserProfileImage />
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
