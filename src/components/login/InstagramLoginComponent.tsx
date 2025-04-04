import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




const InstagramLoginComponent = () => {
    
    return (
        <button className="flex items-center bg-instagram-pink justify-between gap-2 p-1 hover:cursor-pointer hover:translate-x-4 hover:-translate-y-2 transition duration-150 ease-in-out rounded text-xl" type="button">
            <div className="p-1 pr-2 pl-2">
                <FontAwesomeIcon icon={faInstagram} style={{ color: "white",}} size="xl"/>
            </div>

            <div className="">
                <h4>Sign in with Instagram</h4>
            </div>
        </button>
    )
}

export default InstagramLoginComponent