import useAuth from "../hooks/useAuth";

const ProfileData = () => {

    const { user } = useAuth()

    return (
        <div className="flex justify-between pl-5 pr-5 pb-2">
            <div>
                {/*Displays Profile Basic Data*/}
                {
                    user?.role === "USER"
                    ?
                    <div>
                        <h3>{user.displayName}</h3>
                        <h4 className="text-sm">ID: {user.id}</h4>
                        <h4 className="text-sm">Age: 3 Months</h4>
                    </div>
                    :
                    <div>
                        <h3>{user?.compnayName}</h3>
                    </div>
                }
                {/*Displays Links*/}
            </div>
            
            <div className="">
               <button type="button" className="p-2 rounded bg-teal-700">Configure Profile</button>
            </div>
        </div>
    )
}

export default ProfileData;