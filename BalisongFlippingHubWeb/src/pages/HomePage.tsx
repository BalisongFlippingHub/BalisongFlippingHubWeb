import { useNavigate }  from "react-router-dom"
import HomePageCaurosel from "../components/HomePageCaurosel";
import HomePageDataDisplay from "../components/HomePageDataDisplay";


const HomePage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <section className="h-screen">
                <div className="h-full w-full">
                    <h2 className="w-full h-1/6 text-3xl bg-teal-700 font-bold text-center pt-32">Balisong Flipping Hub</h2>
                    <div className="flex h-5/6">
                        <div className="w-1/2 flex flex-col justify-center pl-44 pr-5 items-center">
                            <h3 className="font-bold text-xl mb-4">Welcome</h3>
                            <p className="text-lg font-semibold text-center">
                                Welcome to the Balisong Flipping Hub! The community center for entusiest about balisong flipping, collecting, modding and more!
                                Make a name for yourself, display your flipping clips, post your personal balisongs, put your modding buisness out there or show off your products for all to see.
                            </p>
                            <h3 className="mt-6 font-semibold text-lg">Check out the Community</h3>
                            <button onClick={() => navigate("/community")} className="bg-black p-3 rounded mt-2 hover:bg-slate-500">Community</button>
                            <span className="w-5/6 h-1 bg-black mt-4"></span>
                            <div className="flex">
                                <div className="p-4 flex flex-col items-center w-1/2">
                                    <p className="text-center">Looking to start your flipping career or improve your skills with new tricks with tutorials and slo-mo's?</p>
                                    <h3 className="mt-6 font-semibold text-lg">Check out the Tutorial Center</h3>
                                    <button onClick={() => navigate("/tutorial-center")} className="bg-black p-3 rounded mt-2 hover:bg-slate-500">Tutorial Center</button>
                                </div>
                                <div className="p-4 flex flex-col items-center w-1/2">
                                    <p className="text-center">Want to check out the available prodcucts, biggest makers, or looking for info on a specific knife? </p>
                                    <h3 className="mt-6 font-semibold text-lg">Check out the Product World</h3>
                                    <button onClick={() => navigate("/product-world")} className="bg-black p-3 rounded mt-2 hover:bg-slate-500">Product World</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col items-center justify-center pr-10 pl-20">
                            <HomePageDataDisplay />
                            <HomePageCaurosel />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;