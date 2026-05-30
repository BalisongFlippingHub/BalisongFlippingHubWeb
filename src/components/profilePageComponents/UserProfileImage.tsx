import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UserProfileImage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center absolute pointer-events-none">
      <div
        className="lg:h-56 lg:w-56 md:h-48 md:w-48 sm:h-40 sm:w-40 xsm:h-32 xsm:w-32 rounded-full overflow-hidden lg:-translate-y-28 md:-translate-y-24 sm:-translate-y-20 xsm:-translate-y-16 border-4 border-[#0a0c10] pointer-events-auto hover:cursor-pointer group relative"
        onClick={() => navigate("/configure/profile-image")}
      >
        {user?.profileImg && user.profileImg !== "" ? (
          <div className="w-full h-full">
            <Image imageId={user.profileImg} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1c1f27]">
            <FontAwesomeIcon icon={faCamera} className="text-white/30 text-lg" />
          </div>
        )}

        {/* Edit overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileImage;
