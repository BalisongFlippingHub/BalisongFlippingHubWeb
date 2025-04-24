import UserProfileData from "./UserProfileData";
import UserProfilePostsComponent from "../UserProfilePostsComponent";
import UserProfileBanner from "./UserProfileBanner";
import UserProfileImage from "./UserProfileImage";

const UserProfilePage = () => {
  return (
    <>
      <div className="w-full h-screen">
        {/*Profile Display Info*/}
        <section className="w-full flex flex-col">
          <div className="w-full">
            <UserProfileBanner />
            <UserProfileImage />
          </div>

          <div className="w-full md:h-[55%] xsm:h-[62%]">
            <UserProfileData />
          </div>
        </section>

        {/*Display Profile Posts*/}
        <section className="overflow-hidden">
          <UserProfilePostsComponent />
        </section>
      </div>
    </>
  );
};

export default UserProfilePage;
