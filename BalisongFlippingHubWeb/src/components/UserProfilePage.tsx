import CustomProfileBanner from "./customBanners/CustomProfileBanner";
import CustomProfileImg from "./CustomProfileImg";
import UserProfileData from "./UserProfileData";
import UserProfilePostsComponent from "./UserProfilePostsComponent";

const UserProfilePage = () => {
  return (
    <>
      <section className="text-lg font-semibold border-b flex flex-col justify-between pt-[64px] lg:pl-[192px]">
        {/*Account Info*/}
        <div className="w-full flex flex-col items-center lg:h-80 md:h-72 sm:h-64 xsm:h-52 relative">
          <CustomProfileBanner />
          <CustomProfileImg />
        </div>

        <UserProfileData />
      </section>

      <section className="flex justify-center bg-shadow-green">
        <UserProfilePostsComponent />
      </section>
    </>
  );
};

export default UserProfilePage;
