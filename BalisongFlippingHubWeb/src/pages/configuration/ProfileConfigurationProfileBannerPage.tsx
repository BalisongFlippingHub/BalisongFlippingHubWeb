import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BannerConfiguration from "../../components/accountConfigurationComponents/BannerConfiguration";
import { useNavigate } from "react-router-dom";

const ProfileConfigurationProfileBannerPage = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-[64px] lg:pl-[192px] flex flex-col w-full">
      <div className="w-full p-4">
        <button
          type="button"
          className="bg-shadow hover:bg-shadow-green-offset p-2 rounded text-xl flex gap-2 items-center"
          onClick={() => navigate("/configure")}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <h6>Go Back</h6>
        </button>
      </div>

      <BannerConfiguration />
    </section>
  );
};

export default ProfileConfigurationProfileBannerPage;
