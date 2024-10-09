import { useNavigate } from "react-router-dom";
import DisplayNameConfiguration from "../../components/accountConfigurationComponents/DisplayNameConfiguration";

const ProfileConfigurationDisplayNamePage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-[64px] lg:pl-[192px] flex flex-col items-center gap-2">
      <div className="w-full p-4">
        <button
          type="button"
          className="rounded bg-shadow p-2 hover:bg-shadow-green-offset"
          onClick={() => navigate("/me/configure")}
        >
          Go Back
        </button>
      </div>

      <DisplayNameConfiguration />
    </section>
  );
};

export default ProfileConfigurationDisplayNamePage;
