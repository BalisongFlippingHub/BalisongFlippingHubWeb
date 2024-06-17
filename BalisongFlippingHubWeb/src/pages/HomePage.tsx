import { useNavigate }  from "react-router-dom"
import HomePageCaurosel from "../components/HomePageCaurosel";
import HomePageDataDisplay from "../components/HomePageDataDisplay";


const HomePage = () => {

    const navigate = useNavigate()

    return (
        <section className="h-full">
            <div className="h-1/6 flex justify-center items-center bg-teal-700 text-3xl font-bold">
                <h2>Balisong Flipping Hub</h2>
            </div>
            <div className="h-5/6 flex items-center">
                <div className="w-1/2 flex flex-col justify-center p-8 text-center h-full">
                    <div>
                        <h3 className="font-bold text-2xl">Welcome</h3>
                        <p className="mt-6 font-semibold text-lg">Welcome to the Balisong Flipping Hub! The community center for entusiest about balisong flipping, collecting, modding and more!
                        Make a name for yourself, display your flipping clips, post your personal balisongs, put your modding buisness out there or show off your products for all to see.
                        </p>
                        <h3 className="mt-6 font-semibold text-lg">Check out the Community</h3>
                        <button onClick={() => navigate("/community")} className="bg-black p-3 rounded mt-2 hover:bg-slate-500">Community</button>
                    </div>
                    <div className="flex">
                        <div>
                            <p className="text-center">Looking to start your flipping career or improve your skills with new tricks with tutorials and slo-mo's?</p>
                            <h3 className="mt-6 font-semibold text-lg">Check out the Tutorial Center</h3>
                            <button onClick={() => navigate("/tutorial-center")} className="bg-black p-3 rounded mt-2 hover:bg-slate-500">Tutorial Center</button>
                        </div>
                        <div>
                            <p className="text-center">Want to check out the available prodcucts, biggest makers, or looking for info on a specific knife? </p>
                            <h3 className="mt-6 font-semibold text-lg">Check out the Product World</h3>
                            <button onClick={() => navigate("/product-world")} className="bg-black p-3 rounded mt-2 hover:bg-slate-500">Product World</button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-6">
                    <HomePageDataDisplay />
                    <HomePageCaurosel />
                </div>
            </div>
        </section>
    )
}

export default HomePage;