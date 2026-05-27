import { useNavigate } from "react-router-dom";
import { CollectionKnife } from "../../modals/CollectionKnife";
import Image from "../Image";
import { useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface params {
  knife: CollectionKnife;
}

const OwnedKnifeCard = ({ knife }: params) => {
  const navigate = useNavigate();
  const user     = useAppSelector((state) => state.auth.user);

  return (
    <div
      className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer border border-white/8 hover:border-white/25 transition-all duration-300"
      onClick={() =>
        navigate(
          `/${user?.displayName}/${user?.identifierCode}/collection/${knife.displayName}`
        )
      }
    >

      {/* Cover image or dark placeholder */}
      {knife.coverPhoto && knife.coverPhoto !== "" ? (
        <div className="w-full h-full">
          <Image imageId={knife.coverPhoto} />
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#1c1f27] to-[#0d0f14]" />
      )}

      {/* Score badge — top right, always visible */}
      {knife.averageScore !== null && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] bg-black/60 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full font-medium backdrop-blur-sm">
          <FontAwesomeIcon icon={faStar} className="text-[8px]" />
          {knife.averageScore.toFixed(1)}
        </div>
      )}

      {/* Bottom gradient + name + type */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-3 pt-10">
        {knife.knifeType && (
          <span className="inline-block text-[9px] text-white/40 bg-white/10 border border-white/10 px-1.5 py-0.5 rounded-full mb-1">
            {knife.knifeType}
          </span>
        )}
        <p className="text-white font-semibold text-sm truncate leading-tight">
          {knife.displayName}
        </p>
        {knife.knifeMaker && (
          <p className="text-white/50 text-xs truncate mt-0.5">{knife.knifeMaker}</p>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <span className="text-white/90 text-sm font-medium px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
          View Details
        </span>
      </div>

    </div>
  );
};

export default OwnedKnifeCard;
