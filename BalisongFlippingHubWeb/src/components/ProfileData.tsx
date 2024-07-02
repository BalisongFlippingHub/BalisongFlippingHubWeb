import useAuth from "../hooks/useAuth";

const ProfileData = () => {
    const { user, setUser } = useAuth()

    return (
        <div className="">
            <div>
                {
                    user?.role === "USER"
                    ?
                    <h4>{user?.displayName}</h4>
                    :
                    <h4>{user?.compnayName}</h4>
                }
                <h4>Role: {user?.role}</h4>
            </div>
            <div className="">
                {
                    !user?.facebookLink || user?.facebookLink === ""
                    ?
                    <></>
                    :
                    <h4>Facebook</h4>
                }
                {
                    !user?.instagramLink || user?.instagramLink === ""
                    ?
                    <></>
                    :
                    <h4>Insagram</h4>
                }
                {
                    !user?.twitterLink || user?.twitterLink === ""
                    ?
                    <></>
                    :
                    <h4>Twitter</h4>
                }
                {
                    !user?.personalEmailLink || user?.personalEmailLink === ""
                    ?
                    <></>
                    :
                    <h4>Email</h4>
                }
                {
                    !user?.personalWebsiteLink || user?.personalWebsiteLink === ""
                    ?
                    <></>
                    :
                    <h4>Website</h4>
                }
            </div>
        </div>
    )
}

export default ProfileData;