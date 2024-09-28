import BannerImageConfiguration from "../components/accountConfigurationComponents/BannerImageConfiguration";
import DisplayNameConfiguration from "../components/accountConfigurationComponents/DisplayNameConfiguration";
import ProfileImageConfiguration from "../components/accountConfigurationComponents/ProfileImageConfiguration";

const ProfileConfigurePage = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center lg:pl-[192px] pt-[64px]">
      {/*Display and Editing of Account settings and Info*/}
      <div className="bg-black w-full max-w-[925px] rounded-lg flex flex-col items-center">
        {/*Banner Image Change*/}
        <div className="w-full relative">
          <BannerImageConfiguration />

          {/*Profile Image Change*/}
          <div className="absolute right-0 left-0 bottom-0 translate-y-[195px]">
            <ProfileImageConfiguration />
          </div>
        </div>

        {/*Display Name Change*/}
        <div className="w-full h-52 p-4 flex justify-between z-10">
          <div className="w-2/5 h-full">
            <DisplayNameConfiguration />
          </div>

          {/*Profile Caption Change*/}
          <div className="w-2/5 h-full">
            <h5>Profile Caption</h5>
          </div>
        </div>

        {/*Auth Info Change*/}
      </div>
    </section>
  );
};

export default ProfileConfigurePage;
