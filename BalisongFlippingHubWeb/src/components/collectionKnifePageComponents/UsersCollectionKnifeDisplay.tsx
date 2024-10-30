import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { CollectionKnife } from "../../modals/CollectionKnife";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const UsersCollectionKnifeDisplay = () => {
  const [collectionKnife, setCollectionKnife] =
    useState<CollectionKnife | null>(null);

  const { knife } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const collectionKnives = useAppSelector(
    (state) => state.collection.collectionKnives
  );

  useEffect(() => {
    const foundKnife = collectionKnives.find((obj) => obj.displayName == knife);
    setCollectionKnife(foundKnife!);
  }, []);

  return (
    <section className="lg:pl-[192px] pt-[64px] w-full flex flex-col items-center">
      {/*Go Back Btn*/}
      <div className="w-full p-10">
        <button
          type="button"
          className="text-xl font-bold bg-shadow p-4 rounded hover:bg-shadow-green-offset flex items-center gap-2"
          onClick={() =>
            navigate(`/${user?.displayName}/${user?.identifierCode}/collection`)
          }
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <h4>Back To Collection</h4>
        </button>
      </div>

      {/*Main Display*/}
      <div className="flex flex-col items-center bg-black max-w-[1000px] w-full h-20 mt-20 p-4 rounded relative">
        <div className="w-full"></div>

        <h1>{collectionKnife?.displayName}</h1>
        <h1>{collectionKnife?.id}</h1>
      </div>
    </section>
  );
};

export default UsersCollectionKnifeDisplay;
