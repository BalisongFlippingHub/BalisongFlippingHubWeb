import BannerImageConfiguration from "../components/accountConfigurationComponents/BannerImageConfiguration";

const ProfileConfigurePage = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center lg:pl-[192px] pt-[64px]">
      {/*Display and Editing of Account settings and Info*/}
      <div className="bg-black w-full max-w-[925px] rounded-lg flex flex-col items-center">
        {/*Banner Image Change*/}
        <BannerImageConfiguration />

        {/*Profile Image Change and Display Name Change*/}
        <div className="flex">
          <h5>Profile Image</h5>
          <h5>Display Name</h5>
        </div>

        {/*Profile Caption Change*/}
        <div>
          <h5>Profile Caption</h5>
        </div>

        {/*Auth Info Change*/}
      </div>
    </section>
  );
};

export default ProfileConfigurePage;
