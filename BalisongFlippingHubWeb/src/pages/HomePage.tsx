import useAuth from "../hooks/useAuth"


export const HomePage = () => {

    const { user, token } = useAuth()
    console.log("Home page check user object:", user)
    return (
        <div>
            <h1>Home Page</h1>
            <h1>User: {user?.companyName}</h1>
            <h1>Token: {token}</h1>
        </div>
    )
}