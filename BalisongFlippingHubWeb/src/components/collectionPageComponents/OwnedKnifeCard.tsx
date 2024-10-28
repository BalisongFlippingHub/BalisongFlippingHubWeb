import { useNavigate } from "react-router-dom";
import { CollectionKnife } from "../../modals/CollectionKnife";
import Image from "../Image";

interface params {
  knife: CollectionKnife;
}

const OwnedKnifeCard = ({ knife }: params) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-52 h-80 flex flex-col bg-black rounded hover:cursor-pointer"
      onClick={() => navigate(`/me/collection/knife/${knife.id}`)}
    >
      <div className="w-full flex justify-center text-xl font-bold">
        <h4>{knife.displayName}</h4>
      </div>

      <div className="w-full h-full relative">
        <Image imageId={knife.coverPhoto} />

        <div className="bg-black w-full h-full absolute top-0 opacity-0 hover:opacity-75 flex flex-col items-center">
          <h6>Maker: {knife.knifeMaker}</h6>
          <h6>Model: {knife.baseKnifeModel}</h6>
          <h6>MSRP: {knife.msrp}</h6>
        </div>
      </div>
    </div>
  );
};

export default OwnedKnifeCard;
