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
        <nav className="fixed h-[calc(100%_-_64px)] w-40 translate-y-[64px] border-r border-black flex flex-col justify-between">
            <div className="flex flex-col">
                <NavLink to="/community" style={navlinkStyles} className="p-3 pl-4 w-full border-b border-black"><h1 className="bg-inherit">Community</h1></NavLink>
                <NavLink to="/tutorial-center" style={navlinkStyles} className="p-3 pl-4 w-full border-b border-black">Tutorial Center</NavLink>
                <NavLink to="/product-world" style={navlinkStyles} className="p-2 pl-4 w-full border-b border-black">Product World</NavLink>
                {
                    isLoggedIn()
                    ?
                    <>  
                        <span className="bg-black w-full h-10"></span>
                        <NavLink to="/me" style={navlinkStyles} className="p-2 pl-4 w-full border-b border-black"><h1 className="bg-inherit">Profile</h1></NavLink>
                        <NavLink to="/me" style={navlinkStyles} className="p-2 pl-4 w-full border-b border-black"><h1 className="bg-inherit">Collection</h1></NavLink>
                        <NavLink to="/me" style={navlinkStyles} className="p-2 pl-4 w-full border-b border-black"><h1 className="bg-inherit">Create Post</h1></NavLink>
                    </>
                    :
                    <></>
                }
            </div>
            <div className="">
                <h3 className="p-2">All rights reserved.</h3>
            </div>
        </nav>
    )
}

export default HeaderNavbar; 