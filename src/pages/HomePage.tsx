/** 
 * Home Page Component, Parent Component
 * URL: /
 * 
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";

import HomePageIntroductorySectionComponent from "../components/homePageComponents/HomePageIntroductorySectionComponent";

const HomePage = () => {

  return (
    <div className="flex flex-col items-center">

      {/*Set max width so content doesn't stretch too much on wide screens*/}
      <div className="max-w-[1775px]">
        
        {/*Introductory Section*/}
        <HomePageIntroductorySectionComponent />
        
        {/*Community Info Section*/}
        <section className="w-full h-screen bg-black text-white flex items-center justify-center">
            <h1>TODO - Community</h1>
            <FontAwesomeIcon icon={faGlobe} />
        </section>

        {/*Product World Info Section*/}
        <section className="w-full h-screen bg-shadow-green text-white flex items-center justify-center">
          <h1>TODO - Product World</h1>
          <FontAwesomeIcon icon={faEarthAmericas} />
        </section>

        {/*Tutorial Center Info Section*/}
        <section className="w-full h-screen bg-blue text-white flex items-center justify-center">
          <h1>TODO - Tutorial Center</h1>
          <FontAwesomeIcon icon={faHubspot} />
        </section>

        {/*Footer Section for disclosures and such*/}
        <footer className="w-full h-20 bg-gold text-xl font-bold flex items-center justify-center">
            <h1>TODO - Footer Section</h1>
        </footer>
      </div>
    </div>
    // <>
    //   <section className="md:h-screen xsm:h-auto text-lg font-semibold pt-[48px] lg:pl-[192px] flex flex-col relative bg-shadow-green-offset">
    //     <div className="w-full md:h-1/2 xsm:h-auto flex md:flex-row xsm:flex-col-reverse">
    //       <div className="md:w-1/2 xsm:w-full flex justify-center items-center xsm:p-3 sm:p-7">
    //         <div className="flex flex-col items-center justify-center gap-4 xsm:h-screen sm:h-auto pb-[128px] md:pt-20 xsm:pt-0 sm:pt-0">
    //           <h4 className="text-4xl font-bold">Welcome!</h4>

    //           <p className="text-2xl xsm:text-xl/8 text-center mt-6">
    //             Welcome to the Balisong Flipping Center! The central hub for
    //             balisong related content and the home of knife enthusiest,
    //             flippers, modders and more. Scroll to learn more, or make an
    //             account today to jump right into the balisong community.
    //           </p>

    //           {user && accessToken && accessToken !== "" ? (
    //             <button
    //               type="button"
    //               className="p-4 rounded bg-black text-xl border"
    //             >
    //               To Profile
    //             </button>
    //           ) : (
    //             <>
    //               <button
    //                 type="button"
    //                 onClick={() => navigate("/register")}
    //                 className="p-2 mt-4 rounded bg-black hover:border hover:border-white border border-shadow-green text-xl"
    //               >
    //                 Register Now
    //               </button>

    //               <div className="flex gap-2 items-center">
    //                 <p>Already have an account?</p>
    //                 <button
    //                   type="button"
    //                   onClick={() => navigate("/login")}
    //                   className="underline hover:text-blue"
    //                 >
    //                   Login Here
    //                 </button>
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>

    //       <div className="md:w-1/2 xsm:w-full xsm:collapse sm:visible md:p-10 xsm:p-0 flex items-center justify-center">
    //         <HomePageCaurosel />
    //       </div>
    //     </div>

    //     <div className="w-full flex xsm:flex-col md:flex-row md:h-1/2 xsm:h-auto gap-1">
    //       {/*Community Page Info Display*/}
    //       <div className="md:w-1/3 xsm:w-full p-4 flex flex-col gap-6 items-center justify-center bg-black">
    //         <h3 className="mt-6 font-bold text-3xl underline text-center">
    //           Check out the Community
    //         </h3>

    //         <p className="text-center text-xl">
    //           The hub for balisong enthusiest alike to share their knives,
    //           update their collections, make posts and support the community.
    //         </p>

    //         <button
    //           onClick={() => navigate("/community")}
    //           className="bg-shadow-green-offset p-3 rounded mt-2 hover:border border border-black hover:border-white text-2xl font-bold"
    //         >
    //           Community
    //           <FontAwesomeIcon icon={faGlobe} className="ml-2" />
    //         </button>
    //       </div>

    //       {/*Tutorial Center Info Display*/}
    //       <div className="md:w-1/3 xsm:w-full p-4 flex flex-col gap-6 items-center justify-center bg-black">
    //         <h3 className="mt-6 font-bold text-3xl underline text-center">
    //           Check out the Tutorial Center
    //         </h3>

    //         <p className="text-center text-xl">
    //           For new comers and professionals. Check out the basics, learn new
    //           tricks, or find inspiration from some of the best in the world.
    //         </p>

    //         <button
    //           onClick={() => navigate("/tutorial-center")}
    //           className="bg-shadow-green-offset p-3 rounded mt-2 hover:border border border-black hover:border-white text-2xl font-bold"
    //         >
    //           Tutorial Center
    //           <FontAwesomeIcon icon={faHubspot} className="ml-2" />
    //         </button>
    //       </div>

    //       {/*Product World Info Display*/}
    //       <div className="md:w-1/3 xsm:w-full p-4 flex flex-col gap-6 items-center justify-center bg-black">
    //         <h3 className="mt-6 font-bold text-3xl underline text-center">
    //           Check out the Product World
    //         </h3>

    //         <p className="text-center text-xl">
    //           The informational hub for modders, knife makers, products and
    //           more. Check out the newest in the industry, or information on past
    //           products.
    //         </p>

    //         <button
    //           onClick={() => navigate("/product-world")}
    //           className="bg-shadow-green-offset p-3 rounded mt-2 hover:border border border-black hover:border-white text-2xl font-bold"
    //         >
    //           Product World
    //           <FontAwesomeIcon icon={faEarthAmericas} className="ml-2" />
    //         </button>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="w-full h-40 bg-shadow flex justify-center items-center text-5xl">
    //     <h3>Footer Placeholder</h3>
    //   </section>
    // </>
  );
};

export default HomePage;
