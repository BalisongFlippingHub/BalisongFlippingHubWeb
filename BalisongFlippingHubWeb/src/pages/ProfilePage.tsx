import { useParams } from "react-router-dom";
import UserProfilePage from "../components/profilePageComponents/UserProfilePage";
import { useAppSelector } from "../redux/hooks";
import ProfilePageDisplay from "../components/profilePageComponents/ProfilePageDisplay";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { account, identifier } = useParams();

  console.log(account, identifier);

  if (user?.displayName != account && user?.identifierCode != identifier) {
    // component to display profiles other than the auth account
    return (
      <ProfilePageDisplay displayName={account!} identifierCode={identifier!} />
    );
  } else {
    // home auth page for logged in user
    return <UserProfilePage />;
  }
};

export default ProfilePage;
