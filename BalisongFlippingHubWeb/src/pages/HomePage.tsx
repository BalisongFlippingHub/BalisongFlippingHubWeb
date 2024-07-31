import { useNavigate }  from "react-router-dom"
import HomePageCaurosel from "../components/HomePageCaurosel";
import HomePageDataDisplay from "../components/HomePageDataDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe, faEarthAmericas } from "@fortawesome/free-solid-svg-icons"
import { faHubspot } from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {

    const navigate = useNavigate()

    return (
        <>
            <section className="h-full text-lg font-semibold">
                <div className="h-1/6 flex justify-center items-center bg-shadow-green-offset text-3xl font-bold xsm:collapse xsm:absolute md:visible md:static">
                    <h2 className="">Balisong Flipping Center</h2>
                </div>

                <div className="md:h-5/6 sm:h-auto flex items-center xsm:flex-col-reverse md:flex-row">
                    <div className="md:w-1/2 sm:w-full flex flex-col justify-center p-8 text-center md:h-full sm:h-auto">
                        <div className="text-xl flex flex-col items-center">
                            <h3 className="font-bold text-5xl">Welcome!</h3>
                            <p className="mt-6">Welcome to the Balisong Flipping Hub! The community center for entusiest about balisong flipping, collecting, modding and more!
                            Make a name for yourself, display your flipping clips, post your personal balisongs, put your modding buisness out there or show off your products for all to see.
                            </p>

                            <h3 className="mt-6 font-semibold text-2xl">Check out the Community</h3>

                            <button onClick={() => navigate("/community")} className="bg-black p-3 rounded mt-2 hover:bg-shadow-green-offset">
                                Community
                                <FontAwesomeIcon icon={faGlobe} className="ml-2" />
                            </button>
                        </div>

                        <span className="bg-black h-1 w-full mt-5 mb-5"></span>

                        <div className="flex text-xl gap-4">
                            <div>
                                <p className="text-center">Looking to start your flipping career or improve your skills with new tricks with tutorials and slo-mo's?</p>
                                <h3 className="mt-6 font-semibold text-lg">Check out the Tutorial Center</h3>
                                <button onClick={() => navigate("/tutorial-center")} className="bg-black p-3 rounded mt-2 hover:bg-shadow-green-offset">
                                    Tutorial Center
                                    <FontAwesomeIcon icon={faHubspot} className="ml-2" />
                                </button>
                            </div>

                            <span className="bg-black h-full w-3 rounded"></span>

                            <div>
                                <p className="text-center">Want to check out the available prodcucts, biggest makers, or looking for info on a specific knife? </p>
                                <h3 className="mt-6 font-semibold text-lg">Check out the Product World</h3>
                                <button onClick={() => navigate("/product-world")} className="bg-black p-3 rounded mt-2 hover:bg-shadow-green-offset">
                                    Product World
                                    <FontAwesomeIcon icon={faEarthAmericas} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 xsm:w-full md:mr-10">
                        <HomePageDataDisplay />
                        <HomePageCaurosel />
                    </div>
                </div>
            </section>

            <section className="w-full h-40 bg-shadow flex justify-center items-center text-5xl">
                <h3>Footer Placeholder</h3>
            </section>
        </>
    )
}

export default HomePage;