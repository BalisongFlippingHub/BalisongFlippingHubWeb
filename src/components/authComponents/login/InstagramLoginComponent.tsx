import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




const InstagramLoginComponent = () => {
    
    return (
        <button className="flex items-center bg-instagram-pink justify-between gap-2 p-1 hover:cursor-pointer hover:scale-105 transition duration-200 ease-in rounded text-xl" type="button">
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