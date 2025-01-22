import { useNavigate } from "react-router-dom";
import DisplayNameConfiguration from "../../components/accountConfigurationComponents/DisplayNameConfiguration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProfileConfigurationDisplayNamePage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-[64px] lg:pl-[192px] flex flex-col items-center gap-2">
      <div className="w-full p-4">
        <button
          type="button"
          className="rounded bg-shadow p-2 hover:bg-shadow-green-offset flex items-center gap-4"
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
