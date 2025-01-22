import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileImageConfiguration from "../../components/accountConfigurationComponents/ProfileImageConfiguration";
import { useNavigate } from "react-router-dom";

const ProfileConfigurationProfileImagePage = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-[64px] lg:pl-[192px]">
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

      <ProfileImageConfiguration />
    </section>
  );
};

export default ProfileConfigurationProfileImagePage;
