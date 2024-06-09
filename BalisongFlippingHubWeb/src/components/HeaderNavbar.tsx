import { NavLink } from "react-router-dom";

const HeaderNavbar = () => {

    const navlinkStyles = ({ isActive }: any) => {

        return ({
            fontWeight: isActive ? 'bold' : 'normal', 
            textDecoration: isActive ? 'underline' : 'none'
        })
    }
    
    return (
        <nav className="fixed flex flex-col pt-20 pl-4 pr-4 border border-black h-full">
            <NavLink to="/" style={navlinkStyles} className="mb-3"><h1>Home</h1></NavLink>  {/*Change with logo later*/}
            <NavLink to="/tutorial-center" style={navlinkStyles} className="mb-3">Tutorial Center</NavLink>
            <NavLink to="/product-world" style={navlinkStyles} className="mb-3">Product World</NavLink>
        </nav>
    )
}

export default HeaderNavbar; 