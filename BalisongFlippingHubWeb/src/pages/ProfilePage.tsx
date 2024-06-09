import MakerProfilePage from "../components/MakerProfilePage"
import UserProfilePage from "../components/UserProfilePage"
import useAuth from "../hooks/useAuth"

export const ProfilePage = () => {
    const { user } = useAuth()

    return (
        user?.role === "MAKER"
        ?
        <MakerProfilePage />
        :
        <UserProfilePage />
    )
}