import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import UsersCollectionKnifeDisplay from "../components/collectionKnifePageComponents/UsersCollectionKnifeDisplay";
import CollectionKnifeDisplay from "../components/collectionKnifePageComponents/CollectionKnifeDisplay";

const CollectionKnifePage = () => {
  const { account, identifier, knife } = useParams();

  const user = useAppSelector((state) => state.auth.user);
  const collectionKnives = useAppSelector(
    (state) => state.collection.collectionKnives
  );

  if (
    account == user?.displayName &&
    user?.identifierCode == identifier &&
    collectionKnives.find((obj) => {
      return obj.displayName == knife;
    })
  ) {
    return <UsersCollectionKnifeDisplay />;
  } else {
    return <CollectionKnifeDisplay />;
  }
};

export default CollectionKnifePage;
