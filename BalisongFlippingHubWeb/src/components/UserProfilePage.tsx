import useAuth from "../hooks/useAuth";

const UserProfilePage = () => {

    const { user } = useAuth()
     
    return (
        <div>
            <h1>Makers Profile Page</h1>
            <h1>Compnay Name: {user?.displayName}</h1>
        </div>
    )
}

export default UserProfilePage;