import { NavLink } from "react-router-dom";

const Navbar = () => {

    const navlinkStyles = ({ isActive }: any) => {

        return ({
            fontWeight: isActive ? 'bold' : 'normal', 
            textDecoration: isActive ? 'underline' : 'none'
        })
    }
    
    return (
        <nav className="flex">
            <NavLink to="/" style={navlinkStyles} className="pr-2"><h1>Balisong Flipping Hub</h1></NavLink>  {/*Change with logo later*/}
            <h2> | </h2>
            <NavLink to="/tutorial-center" style={navlinkStyles} className="pr-2 pl-2">Tutorial Center</NavLink>
            <h2> | </h2>
            <NavLink to="/product-world" style={navlinkStyles} className="pl-2">Product World</NavLink>
        </nav>
    )
}

export default Navbar; 