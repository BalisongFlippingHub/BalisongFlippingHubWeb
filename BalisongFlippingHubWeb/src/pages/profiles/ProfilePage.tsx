import UserProfilePage from "../../components/UserProfilePage";
import useAuth from "../../hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  if (user?.role === "ADMIN") {
    return <div></div>;
  } else {
    return <UserProfilePage />;
  }
};

export default ProfilePage;
