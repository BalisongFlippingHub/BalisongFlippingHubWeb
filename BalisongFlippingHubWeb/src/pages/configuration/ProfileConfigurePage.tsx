import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import Image from "../../components/Image";

const ProfileConfigurePage = () => {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [warningIdentifier, setWarningIdentifier] = useState("");

  const user = useAppSelector((state) => state.auth.user);
  const collectionData = useAppSelector((state) => state.collection.collection);

  const navigate = useNavigate();

  const setWarningDiv = (identifier: string) => {
    switch (identifier) {
      case "reset":
        setWarningIdentifier("reset");
        setDisplayWarning(true);
        break;
      case "hide":
        setWarningIdentifier("hide");
        setDisplayWarning(true);
        break;
      case "delete":
        setWarningIdentifier("delete");
        setDisplayWarning(true);
        break;
      default:
        return;
    }
  };

  return (
    <section className="w-full flex justify-center lg:pl-[192px] pt-[64px] relative">
      {/*Display and Editing of Account settings and Info*/}
      <div className="bg-black w-full max-w-[925px] rounded-lg flex flex-col items-center bg-black">
        {/*Banner Image Change*/}
        <div className="w-full relative">
          <div className="w-full h-52 rounded-b-2xl bg-shadow-green-offset relative flex justify-center items-center text-2xl font-bold">
            {user?.bannerImg ? (
              <Image imageId={user?.bannerImg!} />
            ) : (
              <h5>No Banner Image</h5>
            )}

            <button
              type="button"
              className="text-lg font-semibold absolute bottom-4 right-4 bg-shadow p-2 rounded z-10 hover:bg-shadow-green"
              onClick={() => navigate("/me/configure/profile-banner")}
            >
              Edit Banner
            </button>
          </div>

          {/*Profile Image Change*/}
          <div className="rounded-full overflow-hidden absolute w-full flex flex-col gap-2 justify-center items-center -translate-y-[5rem]">
            <div
              className="h-40 w-40 rounded-full overflow-hidden hover:cursor-pointer border-4 border-black hover:border-shadow-green"
              onClick={() => navigate("/me/configure/profile-image")}
            >
              <Image imageId={user?.profileImg!} />
            </div>

            <button
              className="bg-shadow text-lg font-bold p-2 rounded hover:bg-shadow-green"
              onClick={() => navigate("/me/configure/profile-image")}
            >
              Edit Profile Image
            </button>
          </div>
        </div>

        <span className="w-full h-40 p-4"></span>
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

            {/*Preferences*/}
            <div className="w-full border-t-2 flex flex-col items-center mt-5">
              <h5 className="-translate-y-5 text-2xl font-bold bg-black">
                Preferences
              </h5>

              {/*Measurement Units Change*/}
              <div className="w-full flex gap-2">
                <div className="w-1/2 h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                    onClick={() => navigate("/me/configure/measurement_units")}
                  >
                    <div className="flex justify-between text-2xl">
                      <h5>Measurement Units</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>US</h6>
                  </div>
                </div>

                {/*Currency Change*/}
                <div className="w-1/2 h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                    onClick={() => navigate("/me/configure/currency")}
                  >
                    <div className="flex justify-between text-2xl">
                      <h5>Currency</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>US</h6>
                  </div>
                </div>
              </div>
            </div>

            {/*Collection*/}
            <div className="w-full border-t-2 flex flex-col items-center mt-5">
              <h5 className="-translate-y-5 text-2xl font-bold bg-black">
                Collection
              </h5>

              {/*Collection Banner Image Change*/}
              <div className="w-1/2 h-20">
                <div
                  className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                  onClick={() =>
                    navigate("/me/configure/collection-banner-image")
                  }
                >
                  <div className="flex justify-between text-2xl">
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

            {/*Auth*/}
            <div className="w-full border-t-2 flex flex-col items-center mt-5">
              <h5 className="-translate-y-5 text-2xl font-bold bg-black">
                Account
              </h5>

              <div className="w-full flex gap-2">
                {/*Email Change*/}
                <div className="w-1/2 h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                    onClick={() => navigate("/me/configure/email")}
                  >
                    <div className="flex justify-between text-2xl">
                      <h5>Email</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>{user?.email}</h6>
                  </div>
                </div>

                {/*Password Change*/}
                <div className="w-1/2 h-20">
                  <div
                    className="w-full h-full bg-shadow p-2 rounded hover:cursor-pointer hover:bg-shadow-green"
                    onClick={() => navigate("/me/configure/password")}
                  >
                    <div className="flex justify-between text-2xl">
                      <h5>Password</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>

                    <h6>**********</h6>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-center gap-2 mt-10">
                {/*Reset Account*/}
                <div className="w-1/3 h-20">
                  <div
                    className="w-full h-full bg-red p-2 rounded hover:cursor-pointer hover:opacity-25"
                    onClick={() => setWarningDiv("reset")}
                  >
                    <div className="flex items-center justify-between h-full text-2xl">
                      <h5>Reset Account</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                  </div>
                </div>

                {/*Hide Account*/}
                <div className="w-1/3 h-20">
                  <div
                    className="w-full h-full bg-red p-2 rounded hover:cursor-pointer hover:opacity-25"
                    onClick={() => setWarningDiv("hide")}
                  >
                    <div className="flex items-center justify-between h-full text-2xl">
                      <h5>Hide Account</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                  </div>
                </div>

                {/*Delete Account*/}
                <div className="w-1/3 h-20">
                  <div
                    className="w-full h-full bg-red p-2 rounded hover:cursor-pointer hover:opacity-25"
                    onClick={() => setWarningDiv("delete")}
                  >
                    <div className="flex items-center justify-between h-full text-2xl">
                      <h5>Delete Account</h5>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Pop Up Warning*/}
      {displayWarning ? (
        <div className="fixed w-full h-screen flex items-center justify-center">
          <div className="bg-black w-1/3  border p-4 rounded-lg flex flex-col items-center">
            <h5 className="text-3xl text-red font-bold">Warning!</h5>

            {warningIdentifier === "reset" ? (
              <>
                <p className="text-center mb-2 text-lg">
                  You have prompted to reset this account. Which will reset all
                  settings back to their defaults, along with deleting all
                  posts, collected knives, or connections to other accounts.
                </p>

                <p className="text-lg">Do you wish to continue?</p>

                <div className="flex justify-evenly w-full mt-4">
                  <button
                    type="button"
                    onClick={() => setDisplayWarning(false)}
                    className="p-2 rounded bg-shadow"
                  >
                    Go Back
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/me/configure/reset_account")}
                    className="bg-red p-2 rounded"
                  >
                    Reset Account
                  </button>
                </div>
              </>
            ) : warningIdentifier === "hide" ? (
              <>
                <p className="text-center mb-2 text-lg">
                  You have prompted to hide this account. Which will prevent all
                  other users from being able to search or view anything
                  involving this account. This includes all posts, the users
                  collection, and account info.
                </p>

                <p className="text-lg">Do you wish to continue?</p>

                <div className="flex justify-evenly w-full mt-4">
                  <button
                    type="button"
                    onClick={() => setDisplayWarning(false)}
                    className="p-2 rounded bg-shadow"
                  >
                    Go Back
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/me/configure/hide_account")}
                    className="bg-red p-2 rounded"
                  >
                    Hide Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-center mb-2 text-lg">
                  You have promoted to delete your account. Which will
                  permanently remove this account and all ties to the balisong
                  world.
                </p>

                <p className="text-lg">Do you wish to continue?</p>

                <div className="flex justify-evenly w-full mt-4">
                  <button
                    type="button"
                    onClick={() => setDisplayWarning(false)}
                    className="p-2 rounded bg-shadow"
                  >
                    Go Back
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/me/configure/delete_account")}
                    className="bg-red p-2 rounded"
                  >
                    Delete Account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ProfileConfigurePage;
