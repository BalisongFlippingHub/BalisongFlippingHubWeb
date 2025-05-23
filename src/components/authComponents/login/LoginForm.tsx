import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { login } from "../../../redux/auth/authActions";

import {
  setToRememberLoginInfo,
  toggleOffRememberLoginInfo,
} from "../../../redux/auth/authSlice";
import { setCollection } from "../../../redux/collection/collectionSlice";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  // form refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // form value state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  // button enabling and disabling
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // context functions
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const rememberInfo = useSelector(
    (state: RootState) => state.auth.rememberLoginCredentials
  );

  // function to handle setting user input for email field
  const handleOnChangeEmail = (e: string) => {
    setEmail(e);
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
  };

  // function to handle setting user input for password field
  const handleOnChangePassword = (e: string) => {
    setPassword(e);
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
  };

  // submit function to login user
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // checks for valid info to pass
    if (email.trim() === "" || password.trim() === "") return;

    setIsLoading(true)
    {
      /*Authenticate user in back end*/
    }
    dispatch(
      login({
        email,
        password,
      })
    )
      .unwrap()
      .then((res) => {
        // on success save email
        if (rememberInfo) {
          localStorage.setItem("saved-user-email", email);
        }

        // set collection data
        dispatch(setCollection(res.collection));

        navigate("/community");
      })
      .catch((err) => {
        console.log("Error caught attmepting to login: " + err)
        setIsError(true)
        setErrorMsg(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  /*
    Function ran on component load
    - Focuses the user to the email input field
    - TODO- Autofills email and password fields with users credentials when user has selected the "Remember Me" checkbox
    */
  // on mount function
  useEffect(() => {
    // load saved user info
    if (rememberInfo) {
      const fetchedEmail = localStorage.getItem("saved-user-email");
      if (fetchedEmail) setEmail(fetchedEmail);
    }
  }, []);

  /*HTML return for login form component*/
  return (
    <section className="w-full md:h-[calc(100vh_-_60px)] xsm:h-[calc(100vh_-_52px)] flex justify-center items-center">
        <form onSubmit={handleSubmit} className="text-white w-full md:max-w-[500px] xsm:h-full md:h-auto flex flex-col items-center xsm:justify-center md:justify-normal gap-4 md:p-10 xsm:p-5 md:bg-dark-primary md:rounded-lg md:border-4 md:border-black">
          <h1 className="text-4xl font-bold mb-10">Login</h1>

          {
            isError
            ?
            <div className="w-full flex flex-col gap-2 justify-center items-center bg-red p-4 rounded-lg bg-opacity-50 font-bold">
              <p>{errorMsg}</p>

              {
                errorMsg === "Email not verified."
                ?
                <button className="bg-dark-primary p-2 font-bold rounded-lg flex items-center gap-2 hover:bg-blue-primary" type="button" onClick={(() => navigate(`/register/verify/${email}`))}>
                  
                  <h4>Click To Verify</h4>
                  <FontAwesomeIcon icon={faArrowRight} className="animate-pulse" />
                  </button>
                :
                <></>
              }
            </div>
            :
            <></>
          }
          {/*Email input field*/}
          <div className="flex flex-col w-full text-xl relative md:border-2 md:rounded-full">
            <label htmlFor="emailInput" className="absolute top-4 right-5">
                <FontAwesomeIcon icon={faEnvelope} size="xl" />
            </label>

            <input
              type="email"
              id="emailInput"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => handleOnChangeEmail(e.target.value)}
              placeholder="Email"
              value={email}
              required
              className="outline-none bg-dark-primary pt-4 pb-4 pl-6 pr-16 rounded-full"
            />
          </div>

         {/*Password input field*/}
         <div className="flex flex-col w-full text-xl relative md:border-2 md:rounded-full">
            <label
              htmlFor="passwordInput"
              className="absolute top-4 right-5"
            >
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input
              type="password"
              id="passwordInput"
              ref={passwordRef}
              onChange={(e) => handleOnChangePassword(e.target.value)}
              value={password}
              placeholder="Type your password"
              required
              className="outline-none bg-dark-primary pt-4 pb-4 pl-6 pr-16 rounded-full"
            />
          </div>

          
          <div className="w-full flex justify-between pl-4 pr-4">
            {/*Check box for allowing the site to remember specific users*/}
            <div className="flex gap-1 items-center">
              <label htmlFor="rememberMe" className="">
              Remember Me
              </label>

              {rememberInfo ? (
              <input
              defaultChecked
              type="checkbox"
              onClick={() => dispatch(toggleOffRememberLoginInfo())}
              />
              ) : (
              <input
              type="checkbox"
              onClick={() => dispatch(setToRememberLoginInfo())}
              />
              )}
            </div>

            <button type="button">Forgot Password?</button>
          </div>

          {/*SUBMIT Button*/}
          <div className="w-full">
              <button type="submit" className="text-3xl font-bold bg-blue hover:bg-light-blue transition-colors duration-200 ease-linear p-2 w-full text-white rounded-full">
                {
                  isLoading
                  ?
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  :
                  <h3>Login</h3>
                }
                </button>
          </div>
            
          {/*Redirect for users do not have an account.*/}
         <div className="w-full flex justify-center gap-1">
           <p className="">Don't have an account?</p>
           <h3
            className="text-blue hover:cursor-pointer hover:font-bold"
            onClick={() => navigate("/register")}
          >
            Register Here
          </h3>
        </div>

          <span><p>Or</p></span>
          
          <div>
            <GoogleLoginComponent />
          </div>

        </form>
    </section>
    // <section className="flex w-full h-screen sm:pt-[64px] xsm:pt-0 lg:pl-[192px] justify-center items-center text-white">
    //   <form
    //     className="p-8 flex justify-center items-center bg-shadow-green-offset sm:rounded-lg xsm:rounded-none md:w-2/6 sm:w-3/5 xsm:w-full xsm:h-full sm:h-auto text-xl"
    //     onSubmit={handleSubmit}
    //   >
    //     <div className="flex flex-col gap-4">
    //     <h2 className="m-auto text-3xl font-bold bg-shadow-green-offset">
    //       Login
    //     </h2>

    //     {/*Display of errors or alerts during use of login form*/}
    //     {error ? (
    //       <p className="text-red bg-shadow-green-offset m-auto">{errMsg}</p>
    //     ) : (
    //       <p className="text-shadow-green-offset bg-shadow-green-offset">
    //         Fill
    //       </p>
    //     )}

    //     {/*Email input field*/}
    //     <div className="flex flex-col gap-1 bg-shadow-green-offset">
    //       <label
    //         htmlFor="emailInput"
    //         className=" bg-shadow-green-offset font-semibold"
    //       >
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="emailInput"
    //         ref={emailRef}
    //         autoComplete="off"
    //         onChange={(e) => handleOnChangeEmail(e)}
    //         placeholder="example@email.com"
    //         value={email}
    //         required
    //         className="text-white p-2 rounded-lg border border-black bg-shadow-green-offset"
    //       />
    //     </div>

    //     {/*Password input field*/}
    //     <div className="flex flex-col gap-1 bg-shadow-green-offset">
    //       <label
    //         htmlFor="passwordInput"
    //         className=" bg-shadow-green-offset font-semibold"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="passwordInput"
    //         ref={passwordRef}
    //         onChange={(e) => handleOnChangePassword(e)}
    //         value={password}
    //         required
    //         className="p-2 rounded-lg border border-black bg-shadow-green-offset"
    //       />
    //     </div>

    //     {/*Check box for allowing the site to remember specific users*/}
    //     <div className="flex gap-2 bg-shadow-green-offset items-center">
    //       <label htmlFor="rememberMe" className="bg-shadow-green-offset xsm:text-lg">
    //         Remember Me
    //       </label>

    //       {rememberInfo ? (
    //         <input
    //           defaultChecked
    //           type="checkbox"
    //           onClick={() => dispatch(toggleOffRememberLoginInfo())}
    //         />
    //       ) : (
    //         <input
    //           type="checkbox"
    //           onClick={() => dispatch(setToRememberLoginInfo())}
    //         />
    //       )}
    //     </div>

    //     {/*Submit button to login*/}
    //     {isLoading ? (
    //       <button disabled className="p-2 bg-shadow-green-offset rounded">
    //         Loading...
    //       </button>
    //     ) : buttonDisabled ? (
    //       <button
    //         type="submit"
    //         disabled
    //         className="p-2 rounded bg-shadow-green"
    //       >
    //         Login
    //       </button>
    //     ) : (
    //       <button
    //         type="submit"
    //         className="hover:cursor-pointer hover:bg-shadow p-2 rounded bg-shadow-green"
    //       >
    //         Login
    //       </button>
    //     )}

    //     {/*Redirect for users do not have an account.*/}
    //     <div className="text-lg xsm:text-md flex items-center bg-shadow-green-offset">
    //       <p className="bg-shadow-green-offset mr-2">Don't have an account?</p>
    //       <h3
    //         className="text-blue hover:text-light-blue hover:cursor-pointer bg-shadow-green-offset"
    //         onClick={() => navigate("/register")}
    //       >
    //         Register Here
    //       </h3>
    //     </div>

    //     {/*TODO- create div for forgotten passwords*/}

    //     {/*TODO- Create div for oath loggins*/}
    //     <GoogleLoginComponent />

    //     </div>
    //   </form>
    // </section>
  );
};

export default LoginForm;
