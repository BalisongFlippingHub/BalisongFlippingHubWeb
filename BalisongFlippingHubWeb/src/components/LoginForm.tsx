import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/auth/authActions";
import { setToRememberLoginInfo, toggleOffRememberLoginInfo } from "../redux/auth/authSlice";

const LoginForm = () => {
  // form refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // form value state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // button enabling and disabling
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // context functions
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: RootState) => state.auth.error);
  const errMsg = useSelector((state: RootState) => state.auth.errorMsg);
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const rememberInfo = useSelector((state: RootState) => state.auth.rememberLoginCredentials)

  // function to handle setting user input for email field
  const handleOnChangeEmail = (e: any) => {
    setEmail(e.target?.value);
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
  };

  // function to handle setting user input for password field
  const handleOnChangePassword = (e: any) => {
    setPassword(e.target?.value);
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
  };

  // submit function to login user
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // checks for valid info to pass
    if (email.trim() === "" || password.trim() === "") return;

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
      .then(() => {
        // on success save email
        if (rememberInfo) {
          localStorage.setItem("saved-user-email", email)
          navigate("/community")
        }
      });
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
      const fetchedEmail = localStorage.getItem("saved-user-email")
      if (fetchedEmail) setEmail(fetchedEmail)
    }
  }, []);

  /*HTML return for login form component*/
  return (
    <section className="flex w-full h-screen pt-[64px] lg:pl-[192px] justify-center items-center">
      <form
        className="p-8 flex flex-col gap-3 bg-shadow-green-offset rounded-lg md:w-2/6 xsm:w-4/5 text-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="m-auto text-3xl font-bold bg-shadow-green-offset">
          Login
        </h2>

        {/*Display of errors or alerts during use of login form*/}
        {error ? (
          <p className="text-red bg-shadow-green-offset m-auto">{errMsg}</p>
        ) : (
          <p className="text-shadow-green-offset bg-shadow-green-offset">
            Fill
          </p>
        )}

        {/*Email input field*/}
        <div className="flex flex-col gap-1 bg-shadow-green-offset">
          <label
            htmlFor="emailInput"
            className=" bg-shadow-green-offset font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="emailInput"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => handleOnChangeEmail(e)}
            placeholder="example@email.com"
            value={email}
            required
            className="text-white p-2 rounded-lg border border-black bg-shadow-green-offset"
          />
        </div>

        {/*Password input field*/}
        <div className="flex flex-col gap-1 bg-shadow-green-offset">
          <label
            htmlFor="passwordInput"
            className=" bg-shadow-green-offset font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="passwordInput"
            ref={passwordRef}
            onChange={(e) => handleOnChangePassword(e)}
            value={password}
            required
            className="p-2 rounded-lg border border-black bg-shadow-green-offset"
          />
        </div>

        {/*Check box for allowing the site to remember specific users*/}
        <div className="flex gap-2 bg-shadow-green-offset items-center">
          <label htmlFor="rememberMe" className="bg-shadow-green-offset">
            Remember Me
          </label>

          {
            rememberInfo
            ?
            <input checked type="checkbox" onClick={() => dispatch(toggleOffRememberLoginInfo())} />
            :
            <input type="checkbox" onClick={() => dispatch(setToRememberLoginInfo())} />
          }
        </div>

        {/*Submit button to login*/}
        {isLoading ? (
          <button disabled className="p-2 bg-shadow-green-offset rounded">
            Loading...
          </button>
        ) : buttonDisabled ? (
          <button
            type="submit"
            disabled
            className="p-2 rounded bg-shadow-green"
          >
            Login
          </button>
        ) : (
          <button
            type="submit"
            className="hover:cursor-pointer hover:bg-shadow p-2 rounded bg-shadow-green"
          >
            Login
          </button>
        )}

        {/*Redirect for users do not have an account.*/}
        <div className="text-lg flex items-center bg-shadow-green-offset">
          <p className="bg-shadow-green-offset mr-2">Don't have an account?</p>
          <h3
            className="text-blue hover:text-light-blue hover:cursor-pointer bg-shadow-green-offset"
            onClick={() => navigate("/register")}
          >
            Register Here
          </h3>
        </div>

        {/*TODO- create div for forgotten passwords*/}

        {/*TODO- Create div for oath loggins*/}
      </form>
    </section>
  );
};

export default LoginForm;
