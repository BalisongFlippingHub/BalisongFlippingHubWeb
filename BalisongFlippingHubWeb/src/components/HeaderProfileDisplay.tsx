import useAuth from "../hooks/useAuth";

const HeaderProfileDisplay = () => {
    const { user } = useAuth()

    return (
        <h1 className="mt-1">{user?.email!}</h1>
    )
}

export default HeaderProfileDisplay;