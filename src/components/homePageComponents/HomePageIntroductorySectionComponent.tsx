import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../redux/hooks";
import GoogleLoginComponent from "../login/GoogleLoginComponent";
import InstagramLoginComponent from "../login/InstagramLoginComponent";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePageCaurosel from "../HomePageCaurosel";


  
const HomePageIntroductorySectionComponent = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  // get user and access token from redux in case user already logged in
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const navigate = useNavigate()

  useEffect(() => {
    // TODO - Change state based on intersection observer
    setIsVisible(true)
  }, [])

    return (
      <section className="lg:h-screen xsm:h-auto text-white bg-[linear-gradient(0deg,_#108198_0%,_#001a1a_3%,_#023d42_22%,_#001314_35%,_#002e33_88%,_#108198_96%)] pt-[32px]">
          
          <div className={`h-full flex lg:flex-row xsm:flex-col-reverse lg:items-center lg:pr-5 lg:pl-5 lg:gap-10 xsm:gap-5 transition-all duration-[3s] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${isVisible ? "-translate-y-8" : "-translate-y-20"}`}>
            <div className="flex flex-col items-center gap-8 xsm:pl-5 xsm:pr-5 lg:w-[98%] md:w-full xsm:pt-28 lg:pt-0">
              <h4 className="md:text-5xl xsm:text-3xl font-bold">Welcome!</h4>

              <p className="md:text-2xl xsm:text-xl/8 text-center">
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
                  <div className="flex xsm:flex-col md:flex-row gap-4">
                    <GoogleLoginComponent />
                    <InstagramLoginComponent />
                  </div>
                </div>
              }
              
              <span className="w-full h-[.5px] bg-white"></span>

              <div className="text-xl text-center">
                <p className="mb-4">Scroll to learn more and get a tour of the application.</p>

                {/*TODO- Enable users to click on the arrow to automatically scroll to the next section in full screen*/}
                <FontAwesomeIcon icon={faArrowDown} size="xl" className="animate-bounce" />
              </div>

            </div>

            {/*TODO- Will display video of professional flipping on loop*/}
            <div className="w-full lg:h-[30rem] xsm:h-56 lg:rounded-lg overflow-hidden xsm:absolute lg:static xsm:invisible lg:visible">
              <HomePageCaurosel />
            </div>
          </div>
        </section>
    )
}

export default HomePageIntroductorySectionComponent
