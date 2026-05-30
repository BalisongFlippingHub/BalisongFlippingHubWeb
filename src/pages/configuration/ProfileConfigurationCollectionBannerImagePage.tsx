import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CollectionBannerConfiguration from "../../components/accountConfigurationComponents/CollectionBannerConfiguration";

const ProfileConfigurationCollectionBannerImagePage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen flex justify-center pb-28 pt-6 px-4 lg:pl-[192px] bg-[#080a0e]">
      <div className="w-full max-w-[480px] md:max-w-[640px] flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
          </button>
          <h1 className="text-white font-bold text-xl">Collection Banner</h1>
        </div>

        <CollectionBannerConfiguration />

      </div>
    </section>
  );
};

export default ProfileConfigurationCollectionBannerImagePage;
