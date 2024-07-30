import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface params {
    closeNavigation: Function
}

const HeaderNavbar = ({ closeNavigation }: params) => {
    const { isLoggedIn } = useAuth()

    const navlinkStyles = ({ isActive }: any) => {

        return ({
            fontWeight: isActive ? 'bold' : 'normal', 
            backgroundColor: isActive ? '#003333' : 'inherit',
    
        })
    }

    const profileNavLinkStyles = ({ isActive }: any) => {

        return ({
            fontWeight: isActive ? 'bold' : 'normal', 
            backgroundColor: isActive ? 'teal' : 'inherit'
        })
    }
    
    return (
        <nav className="fixed lg:h-[calc(100%_-_64px)] lg:w-40 translate-y-[64px] border-r border-shadow-green-offset flex flex-col justify-between bg-shadow-green z-8 xsm:w-full xsm:h-full">
            <div className="flex flex-col">
                <NavLink to="/community" style={navlinkStyles} className="p-3 pl-4 w-full border-b border-shadow-offset text-center">Community</NavLink>
                <NavLink to="/tutorial-center" style={navlinkStyles} className="p-3 pl-4 w-full border-b border-shadow-offset text-center">Tutorial Center</NavLink>
                <NavLink to="/product-world" style={navlinkStyles} className="p-2 pl-4 w-full border-b border-shadow-offset text-center">Product World</NavLink>
                {
                    isLoggedIn()
                    ?
                    <>  
                        <span className="bg-black w-full h-10"></span>
                        <NavLink to="/me" style={navlinkStyles} className="p-2 pl-4 w-full border-b border-shadow-offset text-center"><h1 className="bg-inherit">Profile</h1></NavLink>
                        <NavLink to="/me/collection" style={profileNavLinkStyles} className="p-2 pl-4 w-full border-b border-shadow-offset text-center"><h1 className="bg-inherit">Collection</h1></NavLink>
                        <NavLink to="/me/create-post" style={profileNavLinkStyles} className="p-2 pl-4 w-full border-b border-shadow-offset text-center"><h1 className="bg-inherit">Create Post</h1></NavLink>
                    </>
                    :
                    <></>
                }

                
                <button className="lg:collapse mt-5 text-xl" type="button" onClick={() => closeNavigation()}>X</button>
            </div>

            <div className="w-full flex flex-col justify-center">
                <NavLink to="/" style={navlinkStyles} className="p-3 pl-4 w-full border-b border-shadow-offset text-center">Contact Us</NavLink>
                <NavLink to="/" style={navlinkStyles} className="p-3 pl-4 w-full border-b border-shadow-offset text-center">About Page</NavLink>
                <h4 className="mt-5 p-1">@ All rights reserved</h4>
            </div>
        </nav>
    )
}

export default HeaderNavbar; 