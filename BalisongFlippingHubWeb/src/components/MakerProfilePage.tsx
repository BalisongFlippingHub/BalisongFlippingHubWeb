import useAuth from "../hooks/useAuth";

const MakerProfilePage = () => {

    const { user } = useAuth()
     
    return (
        <div>
            <h1>Makers Profile Page</h1>
            <h1>Compnay Name: {user?.companyName}</h1>
            <h1>Company Duration: {user?.companyDuration}</h1>
        </div>
    )
}

export default MakerProfilePage;