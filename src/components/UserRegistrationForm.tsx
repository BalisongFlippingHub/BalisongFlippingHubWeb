import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { login, registerNewUser } from "../redux/auth/authActions";
import { clearError, setError } from "../redux/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { setCollection } from "../redux/collection/collectionSlice";

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

  const rememberInfo = useAppSelector(
    (state) => state.auth.rememberLoginCredentials
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDisplayNameChange = (e: any) => {
    setDisplayName(e.target.value);

    if (buttonDisabled) {
      setButtonDisabled(false);
    }

    dispatch(clearError());
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);

    if (buttonDisabled) {
      setButtonDisabled(false);
    }

    dispatch(clearError());
  };

  const handleConfirmedPasswordChange = (e: any) => {
    setConfirmedPassword(e.target.value);

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

    for (var i = 0; i < badDisplayNames.length; i++) {
      if (holderVal.includes(badDisplayNames[i])) {
        dispatch(setError("*Inappropriate display name.*"));
        displayNameRef.current?.focus();
        setButtonDisabled(true);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: any) => {
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
      .then(() => {
        // on successful registration attempt login
        console.log("successful registration. attempting to login user...");
        dispatch(
          login({
            email,
            password,
          })
        )
          .unwrap()
          .then((res) => {
            // set email info if prompted to save
            if (rememberInfo) {
              localStorage.setItem("saved-user-email", email);
            }

            // set collection data
            dispatch(setCollection(res.collection));

            // navigate to community page
            navigate("/community");
          })
          .catch(() => navigate("/login"));
      })
      .catch(() => {});
  };

  return (
    <section className="w-3/4 flex xsm:flex-col md:flex-row">
      {/*Create Account Caption*/}
      <div className="md:w-1/2 xsm:w-full bg-shadow xsm:h-20 md:h-auto flex items-center justify-center">
        <h3 className="text-xl font-bold">
          Start your flipping journey today.
        </h3>
      </div>

      {/*Registration Form*/}
      <form
        className="flex flex-col gap-3 text-lg xsm:w-full md:w-1/2 bg-shadow-green-offset p-12"
        onSubmit={handleSubmit}
      >
        {/*Form Title*/}
        <div className="flex justify-center items-center flex flex-col">
          <h1 className="text-4xl">Register Here</h1>
          {isError ? (
            errMsg === "Error registering new account." ? (
              <p className="text-red">{errMsg}</p>
            ) : (
              <p className="invisible">Fill</p>
            )
          ) : (
            <p className="invisible">Fill</p>
          )}
        </div>

        {/*Email Input Field*/}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <label className="font-semibold">*Email</label>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-inherit border border-black rounded-lg p-2"
          />
        </div>

        {/*Display Name Input Field*/}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <label className="font-semibold">Display Name</label>
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
            onChange={(e) => handleDisplayNameChange(e)}
            value={displayName}
            className="border border-black rounded-lg bg-inherit p-2"
          />
        </div>

        {/*Password Input Field*/}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <label className="font-semibold">*Password</label>
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
            onChange={(e) => handlePasswordChange(e)}
            value={password}
            className="border rounded-lg border-black bg-inherit p-2"
          />
        </div>

        {/*Confirm Password Input Field*/}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <label className="font-semibold">*Confirm Password</label>
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
            onChange={(e) => handleConfirmedPasswordChange(e)}
            value={confirmedPassword}
            className="border rounded-lg border-black bg-inherit p-2"
          />
        </div>

        {/*Create Account Button*/}
        {isLoading ? (
          <button disabled className="p-3 bg-shadow-green rounded text-xl">
            Loading...
          </button>
        ) : buttonDisabled ? (
          <button
            type="submit"
            disabled
            className="p-3 bg-shadow-green rounded text-xl"
          >
            Create Account
          </button>
        ) : (
          <button
            type="submit"
            className="p-3 bg-shadow-green rounded text-xl hover:bg-shadow"
          >
            Create Account
          </button>
        )}

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

        {/*TODO- Create div to handle oath account creation.*/}
      </form>
    </section>
  );
};

export default UserRegistrationForm;
