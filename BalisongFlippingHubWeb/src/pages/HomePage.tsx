import { useNavigate } from "react-router-dom";
import HomePageCaurosel from "../components/HomePageCaurosel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="h-screen text-lg font-semibold pt-[64px] lg:pl-[192px] flex flex-col relative">
        

        <div className="w-full h-1/2"></div>

        <div className="w-full flex h-1/2 gap-1">
          <div className="w-1/3 p-4 flex flex-col items-center bg-black">
            <p className="text-center">
              Check out what the community is up to here at the community page. The home for all balisong enthusiests posting, awesome flipping clips, montages, or inquires about the hobby. 
            </p>

            <h3 className="mt-6 font-semibold text-2xl">
            Check out the Community
            </h3>

            <button
            onClick={() => navigate("/community")}
            className="bg-shadow-green p-3 rounded mt-2 hover:bg-shadow-green-offset"
            >
            Community
            <FontAwesomeIcon icon={faGlobe} className="ml-2" />
            </button>
          </div>

          <div className="w-1/3 flex flex-col items-center p-4 bg-black">
            <p className="text-center">
              Looking to start your flipping career or improve your skills
              with new tricks with tutorials and slo-mo's?
            </p>
            <h3 className="mt-6 font-semibold text-lg">
              Check out the Tutorial Center
            </h3>
            <button
              onClick={() => navigate("/tutorial-center")}
              className="bg-shadow-green p-3 rounded mt-2 hover:bg-shadow-green-offset"
            >
              Tutorial Center
              <FontAwesomeIcon icon={faHubspot} className="ml-2" />
            </button>
          </div>

          <div className="w-1/3 flex flex-col items-center p-4 bg-black">
            <p className="text-center">
              Want to check out the available prodcucts, biggest makers, or
              looking for info on a specific knife?{" "}
            </p>
            <h3 className="mt-6 font-semibold text-lg">
              Check out the Product World
            </h3>
            <button
              onClick={() => navigate("/product-world")}
              className="bg-shadow-green p-3 rounded mt-2 hover:bg-shadow-green-offset"
            >
              Product World
              <FontAwesomeIcon icon={faEarthAmericas} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section className="w-full h-40 bg-shadow flex justify-center items-center text-5xl">
        <h3>Footer Placeholder</h3>
      </section>
    </>
  );
};

export default HomePage;
