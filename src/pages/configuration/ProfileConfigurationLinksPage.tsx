import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import LinkConfiguration from "../../components/accountConfigurationComponents/LinkConfiguration";

type LinkType = "facebook" | "instagram" | "twitter" | "youtube" | "reddit" | "discord" | "email" | "website";

const LINK_TITLES: Record<LinkType, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter / X",
  youtube: "YouTube",
  reddit: "Reddit",
  discord: "Discord",
  email: "Personal Email",
  website: "Personal Website",
};

interface Props {
  linkType: string;
}

const ProfileConfigurationLinksPage = ({ linkType }: Props) => {
  const navigate = useNavigate();

  const isValidLinkType = (type: string): type is LinkType =>
    type in LINK_TITLES;

  if (!isValidLinkType(linkType)) {
    return (
      <section className="w-full min-h-screen flex justify-center pb-28 pt-6 px-4 lg:pl-[192px] bg-[#080a0e]">
        <p className="text-white/40 text-sm">Unknown link type.</p>
      </section>
    );
  }

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
          <h1 className="text-white font-bold text-xl">{LINK_TITLES[linkType]}</h1>
        </div>

        <LinkConfiguration linkType={linkType} />

      </div>
    </section>
  );
};

export default ProfileConfigurationLinksPage;
