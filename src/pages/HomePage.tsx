/** 
 * Home Page Component, Parent Component
 * URL: /
 * 
*/

import { useNavigate } from "react-router-dom";
import HomePageCaurosel from "../components/HomePageCaurosel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEarthAmericas, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../redux/hooks";
import GoogleLoginComponent from "../components/login/GoogleLoginComponent";
import InstagramLoginComponent from "../components/login/InstagramLoginComponent";

const HomePage = () => {

  // get user and access token from redux in case user already logged in
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // necessary to navigate from this page through buttons
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">

      {/*Set max width so content doesn't stretch too much on wide screens*/}
      <div className="max-w-[1775px]">
        
        {/*Introductory Section*/}
        <section className="h-screen text-white bg-[linear-gradient(0deg,_#108198_0%,_#001a1a_3%,_#023d42_22%,_#001314_35%,_#002e33_88%,_#108198_96%)]">
          <div className="flex xsm:flex-col-reverse lg:flex-row justify-center md:items-center xsm:items-start xsm:justify-end md:justify-center gap-4 h-full w-full pl-5 pr-5">
            <div className="flex flex-col items-center gap-8 p-10">
              <h4 className="text-5xl font-bold">Welcome!</h4>

              <p className="text-3xl xsm:text-xl/8 text-center">
                Welcome to the Balisong Flipping Center! The central hub for
                balisong related content and the home of knife enthusiest,
                flippers, modders and more. Scroll to learn more, or make an
                account today to jump right into the community.
              </p>

              {
                user && accessToken && accessToken !== ""
                ?
                <div className="">
                  <p className="text-white text-xl">You are logged in!</p>
                </div>
                :
                <div className="flex flex-col items-center gap-5">

                  {/*Button navigates user to registration page*/}
                  <button className="p-2 bg-black font-bold text-xl rounded hover:scale-125 transition duration-200 ease-in" type="button" onClick={() => navigate("/register")}><h4>Register Here</h4></button>
                  
                  <p>Or</p>

                  {/*Components allow user to either login or register easily with oath2*/}
                  <div className="flex gap-4">
                    <GoogleLoginComponent />
                    <InstagramLoginComponent />
                  </div>
                </div>
              }
              
              <span className="w-full h-[.5px] bg-white"></span>

              <div className="text-xl text-center">
                <p className="mb-4">Scroll to learn more and get a tour of the application.</p>

                {/*TODO- Enable users to click on the arrow to automatically scroll to the next section in full screen*/}
                <FontAwesomeIcon icon={faArrowDown} size="xl"/>
              </div>

            </div>

            {/*TODO- Will display video of professional flipping on loop*/}
            <div className="w-full lg:h-[30rem] md:h-[15rem] xsm:h-36">
              <HomePageCaurosel />
            </div>
          </div>
        </section>
        
        {/*Community Info Section*/}
        <section className="w-full h-screen bg-black text-white flex items-center justify-center">
            <h1>TODO - Community</h1>
        </section>

        {/*Product World Info Section*/}
        <section className="w-full h-screen bg-shadow-green text-white flex items-center justify-center">
          <h1>TODO - Product World</h1>
        </section>

        {/*Tutorial Center Info Section*/}
        <section className="w-full h-screen bg-blue text-white flex items-center justify-center">
          <h1>TODO - Tutorial Center</h1>
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
