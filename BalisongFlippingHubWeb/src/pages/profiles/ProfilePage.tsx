import { useParams } from "react-router-dom";
import UserProfilePage from "../../components/UserProfilePage";
import { useAppSelector } from "../../redux/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { account, identifier } = useParams();

  console.log(account, identifier);

  if (user?.displayName != account && user?.identifierCode != identifier) {
    // todo create component for displaying a different users page
    return <div>test</div>;
  } else {
    return <UserProfilePage />;
  }
};

export default ProfilePage;
