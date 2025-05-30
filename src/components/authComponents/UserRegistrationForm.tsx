import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { registerNewUser } from "../../redux/auth/authActions";
import { clearError, setError } from "../../redux/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const badDisplayNames = [
  "fuck",
  "bitch",
  "cunt",
  "shit",
  "crap",
  "dick",
  "cock",
  "pussy",
  "twat",
  "penis",
  "vagina",
  "testicles",
  "cum",
  "sperm",
  "spunk",
  "orgasm",
  "cunnilingus",
  "analingus",
  "sex",
  "coitus",
  "anal",
];

const UserRegistrationForm = () => {
  // form refs
  const emailRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // input field value states
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  // state to handle button enabling and disabling
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // contexts
  const isLoading = useAppSelector((state) => state.auth.loading);
  const isError = useAppSelector((state) => state.auth.error);
  const errMsg = useAppSelector((state) => state.auth.errorMsg);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDisplayNameChange = (e: string) => {
    setDisplayName(e);

    if (buttonDisabled) {
      setButtonDisabled(false);
    }

    dispatch(clearError());
  };

  const handlePasswordChange = (e: string) => {
    setPassword(e);

    if (buttonDisabled) {
      setButtonDisabled(false);
    }

    dispatch(clearError());
  };

  const handleConfirmedPasswordChange = (e: string) => {
    setConfirmedPassword(e);

    if (buttonDisabled) {
      setButtonDisabled(false);
    }

    dispatch(clearError());
  };

  const passwordCheck = () => {
    confirmedPassword.trim();
    password.trim();

    {
      /*Check for passwords match*/
    }
    if (password != confirmedPassword) {
      dispatch(setError("*Passwords do not match.*"));
      passwordRef.current?.focus();
      setButtonDisabled(true);
      return false;
    }

    return true;
  };

  const displayNameCheck = () => {
    if (displayName === "") return true;

    displayName.trim();
    const holderVal: string = displayName.toLocaleLowerCase();

    for (let i = 0; i < badDisplayNames.length; i++) {
      if (holderVal.includes(badDisplayNames[i])) {
        dispatch(setError("*Inappropriate display name.*"));
        displayNameRef.current?.focus();
        setButtonDisabled(true);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    {
      /*Validate Password*/
    }
    if (!passwordCheck()) return;

    {
      /*Check display name*/
    }
    if (!displayNameCheck()) return;

    {
      /*Prepare Package Data*/
    }
    displayName.trim();
    password.trim();
    email.trim();

    // call function to register
    dispatch(
      registerNewUser({
        email,
        displayName,
        password,
      })
    )
      .unwrap()
      .then((res) => {
        // on successful registration attempt login
        console.log(res)
        navigate("/register/verify/tzenisekj@gmail.com")
      })
      .catch(() => {});
  };

  return (
    <section className="h-[calc(100vh_-_60px)] flex justify-center items-center">
      <div className="flex md:flex-row xsm:flex-col bg-white md:w-4/6 xsm:w-full mb-20">
        {/*Create Account Caption*/}
        <div className="flex flex-col justify-center items-center bg-shadow md:w-1/2 xsm:w-full">
          <h3 className="text-xl font-bold">
            Start your flipping journey today.
          </h3>

          {/*Link to login*/}
          <div className="flex sm:text-lg xsm:text-sm">
            <h4>Already have an account?</h4>
            <button
              className="ml-2 text-blue hover:text-light-blue"
              onClick={() => navigate("/login")}
            >
              Login here
            </button>
          </div>
        </div>

        {/*Registration Form*/}
        <form
          className="flex flex-col gap-5 items-center md:w-1/2 xsm:w-full p-10 bg-dark-primary text-white"
          onSubmit={handleSubmit}
        >
          <div className="font-bold text-2xl">
            <h2>Register</h2>
          </div>

          {/*Email Input Field*/}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <label className="font-semibold text-shadow"></label>
              {isError ? (
                errMsg === "Email already exists." ? (
                  <p className="text-red">{errMsg}</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>

            <input
              type="email"
              required
              ref={emailRef}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none bg-dark-primary border rounded-full text-lg pt-3 pb-3 pl-7"
            />
          </div>

          {/*Display Name Input Field*/}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <label className="font-semibold"></label>
              {isError ? (
                errMsg === "*Inappropriate display name.*" ? (
                  <p className="text-red">{errMsg}</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>

            <input
              type="text"
              ref={displayNameRef}
              onChange={(e) => handleDisplayNameChange(e.target.value)}
              value={displayName}
              placeholder="Display Name"
              className="outline-none bg-dark-primary border rounded-full text-lg pt-3 pb-3 pl-7"
            />
          </div>

          {/*Password Input Field*/}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <label className="font-semibold"></label>
              {isError ? (
                errMsg === "*Passwords do not match.*" ? (
                  <p className="text-red">{errMsg}</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>

            <input
              type="password"
              required
              ref={passwordRef}
              onChange={(e) => handlePasswordChange(e.target.value)}
              value={password}
              placeholder="Password"
              className="outline-none bg-dark-primary border rounded-full text-lg pt-3 pb-3 pl-7"
            />
          </div>

          {/*Confirm Password Input Field*/}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <label className="font-semibold"></label>
              {isError ? (
                errMsg === "*Passwords do not match.*" ? (
                  <p className="text-red">{errMsg}</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>

            <input
              type="password"
              required
              ref={confirmPasswordRef}
              onChange={(e) => handleConfirmedPasswordChange(e.target.value)}
              value={confirmedPassword}
              placeholder="Confirm Password"
              className="outline-none bg-dark-primary border rounded-full text-lg pt-3 pb-3 pl-7"
            />
          </div>

          {/*Create Account Button*/}
          {isLoading ? (
            <button disabled className="">
              Loading...
            </button>
          ) : buttonDisabled ? (
            <button type="submit" disabled className="">
              Create Account
            </button>
          ) : (
            <button
              type="submit"
              className="hover:bg-shadow bg-blue w-full text-xl font-semibold p-3 rounded-full"
            >
              Create Account
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default UserRegistrationForm;
