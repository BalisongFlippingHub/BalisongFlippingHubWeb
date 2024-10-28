import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import FacebookLinkConfiguration from "../../components/accountConfigurationComponents/FacebookLinkConfiguration";
import InstagramLinkConfiguration from "../../components/accountConfigurationComponents/InstagramLinkConfiguration";
import TwitterLinkConfiguration from "../../components/accountConfigurationComponents/TwitterLinkConfiguration";
import YoutubeLinkConfiguration from "../../components/accountConfigurationComponents/YoutubeLinkConfiguration";
import RedditLinkConfiguration from "../../components/accountConfigurationComponents/RedditLinkConfiguration";
import DiscordLinkConfiguration from "../../components/accountConfigurationComponents/DiscordLinkConfiguration";
import PersonalEmailLinkConfiguration from "../../components/accountConfigurationComponents/PersonalEmailLinkConfiguration";
import PersonalWebsiteLinkConfiguration from "../../components/accountConfigurationComponents/PersonalWebsiteLinkConfiguration";

interface params {
  linkType: string;
}

const ProfileConfigurationLinksPage = ({ linkType }: params) => {
  const navigate = useNavigate();

  const getUpdateLinkComponent = () => {
    switch (linkType) {
      case "facebook":
        return <FacebookLinkConfiguration />;
      case "instagram":
        return <InstagramLinkConfiguration />;
      case "twitter":
        return <TwitterLinkConfiguration />;
      case "youtube":
        return <YoutubeLinkConfiguration />;
      case "reddit":
        return <RedditLinkConfiguration />;
      case "discord":
        return <DiscordLinkConfiguration />;
      case "email":
        return <PersonalEmailLinkConfiguration />;
      case "website":
        return <PersonalWebsiteLinkConfiguration />;
      default:
        return <h1>404 Link Page</h1>;
    }
  };

  return (
    <section className="pt-[64px] lg:pl-[192px] w-full flex flex-col items-center w-full">
      {/*Go Back Btn*/}
      <div className="w-full p-4">
        <button
          type="button"
          className="flex items-center gap-2 text-xl bg-shadow p-2 rounded hover:bg-shadow-green-offset"
          onClick={() => navigate("/configure")}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <h5>Go Back</h5>
        </button>
      </div>

      {/*Display Correct Link To Update*/}
      {getUpdateLinkComponent()}
    </section>
  );
};

export default ProfileConfigurationLinksPage;
