import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { CollectionKnife } from "../../modals/CollectionKnife";
import OwnedKnifeCard from "./OwnedKnifeCard";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";

const CollectionOwnedKnivesDisplay = () => {
  const ownedKnives: Array<CollectionKnife> = useAppSelector(
    (state) => state.collection.collectionKnives
  );
  const user     = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const favoriteKnife = ownedKnives?.find((k) => k.isFavoriteKnife) ?? null;

  return (
    <div className="flex-1 min-w-0 flex flex-col px-6 pt-5 xsm:pb-4 md:pb-8">

      {/* ── Favorite knife spotlight ── */}
      {favoriteKnife && (
        <div
          className="w-full mb-6 rounded-xl overflow-hidden border border-blue-primary/30 bg-gradient-to-r from-blue-primary/10 to-transparent cursor-pointer hover:border-blue-primary/50 transition-all duration-200"
          onClick={() =>
            navigate(
              `/${user?.displayName}/${user?.identifierCode}/collection/${favoriteKnife.displayName}`
            )
          }
        >
          <div className="flex items-stretch">

            {/* Cover image */}
            <div className="xsm:w-20 xsm:h-28 md:w-28 md:h-36 flex-shrink-0 overflow-hidden">
              {favoriteKnife.coverPhoto && favoriteKnife.coverPhoto !== "" ? (
                <Image imageId={favoriteKnife.coverPhoto} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1c1f27] to-[#0d0f14]" />
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center px-4 py-3 gap-1 min-w-0">
              <span className="text-blue-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <FontAwesomeIcon icon={faStar} className="text-[9px]" />
                Favorite Knife
              </span>
              <h3 className="text-white font-bold xsm:text-base md:text-lg leading-tight truncate">
                {favoriteKnife.displayName}
              </h3>
              <p className="text-white/50 text-sm truncate">
                {favoriteKnife.knifeMaker}
                {favoriteKnife.baseKnifeModel ? ` · ${favoriteKnife.baseKnifeModel}` : ""}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {favoriteKnife.averageScore !== null && (
                  <span className="flex items-center gap-1 text-[11px] text-gold bg-gold/10 border border-gold/25 px-2 py-0.5 rounded-full font-medium">
                    <FontAwesomeIcon icon={faStar} className="text-[9px]" />
                    {favoriteKnife.averageScore.toFixed(1)}
                  </span>
                )}
                {favoriteKnife.knifeType && (
                  <span className="text-[11px] text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                    {favoriteKnife.knifeType}
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Section header ── */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg">Knives</h3>
      </div>

      {/* ── Grid ── */}
      <div className="grid xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">

        {/* Add knife card */}
        <button
          type="button"
          onClick={() => navigate("/add-collection-knife")}
          className="aspect-[3/4] rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/[0.03] hover:bg-white/[0.06] flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-200">
            <FontAwesomeIcon icon={faPlus} className="text-white/40 group-hover:text-white/70 text-sm" />
          </div>
          <span className="text-white/40 text-xs group-hover:text-white/60 transition-colors duration-200">
            Add Knife
          </span>
        </button>

        {ownedKnives?.map((knife, i) => (
          <OwnedKnifeCard knife={knife} key={i} />
        ))}

      </div>
    </div>
  );
};

export default CollectionOwnedKnivesDisplay;
