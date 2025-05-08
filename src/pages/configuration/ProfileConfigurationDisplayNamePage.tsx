import { useNavigate } from "react-router-dom";
import DisplayNameConfiguration from "../../components/accountConfigurationComponents/DisplayNameConfiguration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProfileConfigurationDisplayNamePage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full flex flex-col items-center gap-2 h-screen">
      <div className="w-full p-4">
        <button
          type="button"
          className="rounded p-2 flex items-center gap-4 text-white hover:scale-110 transition-transform ease-linear duration-300"
          onClick={() => navigate("/configure")}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" />
          <h5>Go Back</h5>
        </button>
      </div>

      <DisplayNameConfiguration />
    </section>
  );
};

export default ProfileConfigurationDisplayNamePage;
