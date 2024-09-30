import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BannerImageConfiguration from "../components/accountConfigurationComponents/BannerImageConfiguration";
import ProfileImageConfiguration from "../components/accountConfigurationComponents/ProfileImageConfiguration";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProfileConfigurePage = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <section className="w-full h-screen flex justify-center items-center lg:pl-[192px] pt-[64px]">
      {/*Display and Editing of Account settings and Info*/}
      <div className="bg-black w-full max-w-[925px] rounded-lg flex flex-col items-center">
        {/*Banner Image Change*/}
        <div className="w-full relative">
          <BannerImageConfiguration />

          {/*Profile Image Change*/}
          <div className="absolute right-0 left-0 bottom-0 translate-y-[196px]">
            <ProfileImageConfiguration />
          </div>
        </div>

        <span className="w-full h-36 p-4"></span>
        <div className="w-full h-full p-4 flex flex-col gap-6 mt-10">
          {/*Display Name and Caption*/}
          <div className="w-full flex gap-2">
            <div className="w-1/2 h-20">
              {/*Display Name Link*/}
              <div
                className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                onClick={() => navigate("/me/configure/display_name")}
              >
                <div className="flex justify-between text-2xl">
                  <h5>Display Name</h5>
                  <FontAwesomeIcon icon={faEdit} />
                </div>

                <h6>
                  {user?.displayName && user?.displayName !== ""
                    ? user?.displayName
                    : user?.id}
                </h6>
              </div>
            </div>

            <div className="w-1/2 h-20">
              <div
                className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                onClick={() => navigate("/me/configure/about_me")}
              >
                <div className="flex justify-between text-2xl">
                  <h5>Profile Caption</h5>
                  <FontAwesomeIcon icon={faEdit} />
                </div>

                <h6>...</h6>
              </div>
            </div>
          </div>

          {/*Links*/}
          <div className="w-full border-t-2 flex flex-col gap-2 items-center">
            <h5 className="-translate-y-5 text-2xl bg-black w-14">Links</h5>

            <div className="flex w-full gap-2">
              {/*Facebook Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/facebook_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Facebook</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.facebookLink && user?.facebookLink !== ""
                      ? user?.facebookLink
                      : "..."}
                  </h6>
                </div>
              </div>

              {/*Instagram Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/instagram_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Instagram</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.instagramLink && user.instagramLink !== ""
                      ? user.instagramLink
                      : "..."}
                  </h6>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-2">
              {/*Twitter Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/twitter_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Twitter</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.twitterLink && user?.twitterLink !== ""
                      ? user?.twitterLink
                      : "..."}
                  </h6>
                </div>
              </div>

              {/*Youtube Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/youtube_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Youtube</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.youtubeLink && user?.youtubeLink !== ""
                      ? user?.youtubeLink
                      : "..."}
                  </h6>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-2">
              {/*Reddit Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/reddit_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Reddit</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.redditLink && user?.redditLink !== ""
                      ? user?.redditLink
                      : "..."}
                  </h6>
                </div>
              </div>

              {/*Discord Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/discord_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Discord</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.discordLink && user?.discordLink !== ""
                      ? user?.discordLink
                      : "..."}
                  </h6>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-2">
              {/*Personal Email Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() => navigate("/me/configure/personal_email_link")}
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Personal Email</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.personalEmailLink && user?.personalEmailLink !== ""
                      ? user?.personalEmailLink
                      : "..."}
                  </h6>
                </div>
              </div>

              {/*Personal Website Edit*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() =>
                    navigate("/me/configure/personal_website_link")
                  }
                >
                  <div className="flex justify-between text-2xl">
                    <h5>Personal Website</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>
                    {user?.personalWebsiteLink &&
                    user?.personalWebsiteLink !== ""
                      ? user?.personalWebsiteLink
                      : "..."}
                  </h6>
                </div>
              </div>
            </div>

            {/*Auth*/}
            <div className="w-full border-t-2 flex flex-col items-center mt-5">
              <h5 className="-translate-y-5 text-2xl font-bold bg-black">
                Account
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileConfigurePage;
