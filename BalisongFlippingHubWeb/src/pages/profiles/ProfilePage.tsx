import UserProfilePage from "../../components/UserProfilePage";
import { useAppSelector } from "../../redux/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (user?.role === "ADMIN") {
    return <div></div>;
  } else {
    return <UserProfilePage />;
  }
};

export default ProfilePage;
