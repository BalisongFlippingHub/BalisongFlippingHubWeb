import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

import UsersCollectionPageComponent from "../components/collectionPageComponents/UsersCollectionPageComponent";

const UserCollectionPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { account, identifier } = useParams();

  if (user?.displayName == account && user?.identifierCode == identifier) {
    return <UsersCollectionPageComponent />;
  } else {
    // todo create component for displaying a different users collection
    return <div>Todo</div>;
  }
};

export default UserCollectionPage;
