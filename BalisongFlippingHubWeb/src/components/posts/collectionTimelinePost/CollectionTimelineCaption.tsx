import { useLocation, useNavigate } from "react-router-dom";

interface params {
  knifeDisplayName: string;
}

const CollectionTimelineCaption = ({ knifeDisplayName }: params) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationToCollectionKnife = () => {
    navigate(location.pathname + `/${knifeDisplayName}`);
  };

  return (
    <div className="w-full font-semibold text-2xl p-2">
      <p>
        Just aqquired my new{" "}
        <b
          className="hover:cursor-pointer hover:text-blue"
          onClick={() => getNavigationToCollectionKnife()}
        >
          {knifeDisplayName}
        </b>{" "}
        today! Check it out!
      </p>
    </div>
  );
};

export default CollectionTimelineCaption;
