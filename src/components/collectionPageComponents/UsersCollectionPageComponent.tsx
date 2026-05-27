import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Image from "../Image";
import CollectionOwnedKnivesDisplay from "./CollectionOwnedKnivesDisplay";
import CollectionPostsDisplay from "./CollectionPostsDisplay";
import CollectionBannerComponent from "./collectionBannerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UsersCollectionPageComponent = () => {
  const ownedKnives  = useAppSelector((state) => state.collection.collectionKnives);
  const user         = useAppSelector((state) => state.auth.user);
  const navigate     = useNavigate();

  const knifeCount = ownedKnives?.length ?? 0;

  // Est. total value — parse numeric part of msrp strings, skip blanks / non-numeric
  const totalValue = (ownedKnives ?? []).reduce((sum, k) => {
    const parsed = parseFloat((k.msrp ?? "").replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? sum : sum + parsed;
  }, 0);

  // Avg score — only knives that have been scored
  const scoredKnives = (ownedKnives ?? []).filter((k) => k.averageScore !== null);
  const avgScore =
    scoredKnives.length > 0
      ? scoredKnives.reduce((sum, k) => sum + (k.averageScore ?? 0), 0) / scoredKnives.length
      : null;

  const statsItems = [
    { value: knifeCount.toString(),                                                                        label: "Knives"    },
    { value: totalValue > 0 ? `$${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "—", label: "Est. Value" },
    { value: avgScore !== null ? avgScore.toFixed(1) : "—",                                                label: "Avg Score" },
  ];

  return (
    <section className="w-full flex flex-col">

      {/* Banner */}
      <CollectionBannerComponent />

      {/* Combined info + stats bar */}
      <div className="w-full px-6 py-5 flex items-center gap-5 text-white border-b border-white/10">

        {/* Profile image */}
        <div
          className="xsm:w-14 xsm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/15 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={() => navigate(`/${user?.displayName}/${user?.identifierCode}`)}
        >
          {user?.profileImg && user.profileImg !== "" ? (
            <Image imageId={user.profileImg} />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white/30 text-lg" />
            </div>
          )}
        </div>

        {/* Name + stats */}
        <div className="flex flex-col gap-2.5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(`/${user?.displayName}/${user?.identifierCode}`)}
          >
            <h2 className="text-white font-bold xsm:text-base md:text-lg leading-none hover:text-white/80 transition-colors duration-200">
              {user?.displayName}
            </h2>
            <span className="text-[11px] text-white/35 font-medium bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full leading-none">
              #{user?.identifierCode}
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {statsItems.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 md:gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold xsm:text-base md:text-lg leading-none">
                    {stat.value}
                  </span>
                  <span className="text-white/30 text-[9px] uppercase tracking-widest leading-none">
                    {stat.label}
                  </span>
                </div>
                {i < statsItems.length - 1 && (
                  <div className="w-px h-5 bg-white/10 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Knives grid + activity sidebar */}
      <section className="w-full flex xsm:flex-col md:flex-row">
        <CollectionOwnedKnivesDisplay />
        <CollectionPostsDisplay />
      </section>

    </section>
  );
};

export default UsersCollectionPageComponent;
