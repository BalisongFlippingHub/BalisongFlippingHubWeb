import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileCaptionConfiguration = () => {
  return (
    <div className="w-full h-full p-2 bg-shadow rounded hover:cursor-pointer hover:bg-shadow-green">
      <div className="flex justify-between text-2xl font-bold">
        <h5>About Me</h5>
        <FontAwesomeIcon icon={faEdit} />
      </div>

      <h6>...</h6>
    </div>
  );
};

export default ProfileCaptionConfiguration;
