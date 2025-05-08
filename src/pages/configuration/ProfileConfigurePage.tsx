import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProfileConfigurePage = () => {


  const user = useAppSelector((state) => state.auth.user);
  const collectionData = useAppSelector((state) => state.collection.collection);

  const navigate = useNavigate();

  return (
    <section className="w-full flex justify-center relative pb-10">
      <div className="w-full max-w-[925px] rounded-lg flex flex-col items-center">
        {/*Title*/}
        <div className="text-3xl text-white font-bold md:w-full xsm:w-5/6 flex justify-center border-b pb-4 pt-4">
          <h2>Settings</h2>
        </div>

        {/*Search Bar*/}
        <div className="w-full flex justify-center pt-5 pb-5">
          <input
            type="search"
            placeholder="Search..."
            className="bg-black p-2 rounded-lg w-2/3 text-white"
          />
        </div>

        <div className="w-full h-full p-4 flex flex-col">
          <div className="text-2xl text-white font-semibold pl-4">
            <h2>Account Settings</h2>
          </div>
          {/*Account Settings*/}
          <div className="flex flex-col gap-4 p-4">
            {/*Display Name and Caption*/}
            <div className="w-full flex md:flex-row xsm:flex-col gap-2">
              <div className="md:w-1/2 xsm:w-full h-20">
                {/*Display Name Link*/}
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                  onClick={() => navigate("/configure/display_name")}
                >
                  <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                    <h5>Display Name</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6 className="">
                    {user?.displayName && user?.displayName !== ""
                      ? user?.displayName
                      : user?.id}
                  </h6>
                </div>
              </div>

              <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                  onClick={() => navigate("/configure/about_me")}
                >
                  <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                    <h5>Profile Caption</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>...</h6>
                </div>
              </div>
            </div>

            {/*Privacy and Badges*/}
            <div>
              <div className="md:w-1/2 xsm:w-full h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                  onClick={() => navigate("/configure/about_me")}
                >
                  <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                    <h5>Badges Display</h5>
                    <FontAwesomeIcon icon={faEdit} />
                  </div>

                  <h6>...</h6>
                </div>
              </div>
            </div>

            {/*Links*/}
            <div className="w-full flex flex-col gap-2 items-center">
              <div className="text-white text-xl font-semibold border-b w-full flex justify-center">
                <h3>Links</h3>
              </div>

              <div className="flex md:flex-row xsm:flex-col w-full gap-2">
                {/*Facebook Edit*/}
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/facebook_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
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
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/instagram_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
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

              <div className="flex md:flex-row xsm:flex-col w-full gap-2">
                {/*Twitter Edit*/}
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/twitter_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
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
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/youtube_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
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

              <div className="flex md:flex-row xsm:flex-col w-full gap-2">
                {/*Reddit Edit*/}
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/reddit_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
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
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/discord_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
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

              <div className="flex md:flex-row xsm:flex-col w-full gap-2">
                {/*Personal Email Edit*/}
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/personal_email_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                      <h5>Email</h5>
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
                <div className="md:w-1/2 xsm:w-full h-20 overflow-hidden">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/personal_website_link")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                      <h5>Website</h5>
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

              {/*Collection*/}
              <div className="w-full flex flex-col items-center mt-5 gap-2">
                <div className="text-white text-xl font-semibold border-b w-full flex justify-center">
                  <h3>Collection Settings</h3>
                </div>
                {/*Collection Banner Image Change*/}
                <div className="md:w-1/2 xsm:w-full h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() =>
                      navigate("/configure/collection-banner-image")
                    }
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                      <h5>Banner Image</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>
                      {collectionData?.bannerImg
                        ? collectionData.bannerImg
                        : "..."}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="text-2xl text-white font-bold">
              <h2>App Settings</h2>
            </div>
            <div className="w-full flex flex-col items-center mt-5">
              {/*Measurement Units Change*/}
              <div className="w-full flex md:flex-row xsm:flex-col gap-2">
                <div className="md:w-1/2 xsm:w-full h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/measurement_units")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                      <h5>Measure Units</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>US</h6>
                  </div>
                </div>

                {/*Currency Change*/}
                <div className="md:w-1/2 xsm:w-full h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-blue-primary"
                    onClick={() => navigate("/configure/currency")}
                  >
                    <div className="flex justify-between md:text-2xl xsm:text-xl font-bold">
                      <h5>Currency</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>US</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ProfileConfigurePage;
