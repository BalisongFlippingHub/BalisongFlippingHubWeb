import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HeaderNavbar = () => {
    const { isLoggedIn } = useAuth()

    const navlinkStyles = ({ isActive }: any) => {

        return ({
            fontWeight: isActive ? 'bold' : 'normal', 
            backgroundColor: isActive ? 'teal' : 'inherit'
        })
    }
    
    return (
        <nav className="fixed flex flex-col justify-between pt-16 border border-black h-full">
            <div className="flex flex-col">
                <NavLink to="/" style={navlinkStyles} className="p-2 pl-4 w-full"><h1 className="bg-inherit">Home</h1></NavLink>
                <NavLink to="/tutorial-center" style={navlinkStyles} className="p-2 pl-4 w-full bg-inherit">Tutorial Center</NavLink>
                <NavLink to="/product-world" style={navlinkStyles} className="p-2 pl-4 w-full bg-inherit">Product World</NavLink>
                <span className="w-full h-2 bg-black"></span>
                {
                    isLoggedIn()
                    ?
                    <>
                        <NavLink to="/me" style={navlinkStyles} className="p-2 pl-4 w-full"><h1 className="bg-inherit">Profile</h1></NavLink>
                    </>
                    :
                    <></>
                }
            </div>
            <div>
                <h3 className="p-2">All rights reserved.</h3>
            </div>
        </nav>
    )
}

export default HeaderNavbar; 