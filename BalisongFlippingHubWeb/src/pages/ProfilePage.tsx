import UserProfilePage from "../components/UserProfilePage"
import useAuth from "../hooks/useAuth"

export const ProfilePage = () => {
    const { user } = useAuth()

    return (
        <UserProfilePage />
    )
}