import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosApiInstance } from "../api/axios";

const VerificationTokenInput = () => {
    const firstInputRef = useRef<HTMLInputElement>(null)
    const secondInputRef = useRef<HTMLInputElement>(null)
    const thirdInputRef = useRef<HTMLInputElement>(null)
    const fourthInputRef = useRef<HTMLInputElement>(null)
    const fifthInputRef = useRef<HTMLInputElement>(null)
    const sixthInputRef = useRef<HTMLInputElement>(null)

  const [verifiedToken, setVerifiedToken] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadyForSubmit, setIsReadyForSubmit] = useState(false);

  const emailParam = useParams();
  const navigate = useNavigate();

  const checkTokenForSubmit = () => {
    for (let i = 0; i < verifiedToken.length; i++) {
        if (verifiedToken[i] === null || verifiedToken[i] === undefined) {
            return false
        }
    }

    return true
  }

  const onTokenInput = (value: string, inputEntry: number) => {
    setVerifiedToken((prev) => {
       const newArr = prev
       newArr[inputEntry] = value
       return newArr
    })

    switch(inputEntry) {
        case 0:
            if (value !== "" && value !== null)
                secondInputRef.current?.focus()

            break
        case 1:
            if (value !== "" && value !== null)
                thirdInputRef.current?.focus()

            break
        case 2:
            if (value !== "" && value !== null)
                fourthInputRef.current?.focus()

            break
        case 3:
            if (value !== "" && value !== null)
                fifthInputRef.current?.focus()

            break
        case 4:
            if (value !== "" && value !== null)
                sixthInputRef.current?.focus()

            break
        case 5:
            if (value !== "" && value !== null)
                sixthInputRef.current?.blur()

            break
        default:
            break
    }

    setIsReadyForSubmit(checkTokenForSubmit())
    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true)
    await axiosApiInstance.request({
        url: `/auth/verify-email-token/${convertVerifiedTokenToString()}`,
        method: "get",
      })
      .then((res) => {
        alert(res)
        console.log(res)
      })
      .catch((error) => {
        alert(error)
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  const convertVerifiedTokenToString = () => {
    let t = ""
    
    verifiedToken.forEach((val) => {
        t += val
    })

    return t
  }

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  return (
    <div className="text-white text-xl xsm:text-lg">
      <form
        className="flex flex-col gap-7 items-center xsm:justify-center md:justify-normal bg-dark-primary p-10 md:rounded-lg border-4 border-black max-w-[750px] xsm:h-screen md:h-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-4xl xsm:text-3xl font-bold">Two Factor Authentication</h2>
        <h4>{`Check your email "${emailParam.verifiedEmail}" for 6 digit verification code.`}</h4>

        <div className="flex gap-10 xsm:gap-3 text-3xl">
          <input
            type="number"
            ref={firstInputRef}
            required
            onChange={(e) => onTokenInput(e.target.value, 0)}
            
            className="text-black p-2 font-bold w-14 flex text-center outline-none focus:scale-125 transition-transform ease-linear duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            ref={secondInputRef}
            required
            onChange={(e) => onTokenInput(e.target.value, 1)}
            className="text-black p-2 font-bold w-14 flex text-center outline-none focus:scale-125 transition-transform ease-linear duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            ref={thirdInputRef}
            required
            onChange={(e) => onTokenInput(e.target.value, 2)}
            className="text-black p-2 font-bold w-14 flex text-center outline-none focus:scale-125 transition-transform ease-linear duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            ref={fourthInputRef}
            required
            onChange={(e) => onTokenInput(e.target.value, 3)}
            className="text-black p-2 font-bold w-14 flex text-center outline-none focus:scale-125 transition-transform ease-linear duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            ref={fifthInputRef}
            required
            onChange={(e) => onTokenInput(e.target.value, 4)}
            className="text-black p-2 font-bold w-14 flex text-center outline-none focus:scale-125 transition-transform ease-linear duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            ref={sixthInputRef}
            required
            onChange={(e) => onTokenInput(e.target.value, 5)}
            className="text-black p-2 font-bold w-14 flex text-center outline-none focus:scale-125 transition-transform ease-linear duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {isReadyForSubmit ? (
          <button
            type="submit"
            className="bg-blue-primary w-full pt-4 pb-4 rounded-full text-2xl font-bold"
          >
            {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" size="lg"/> : <h3>Verify</h3>}
          </button>
        ) : (
          <button
            type="submit"
            disabled
            className="bg-blue-primary bg-opacity-30 w-full pt-4 pb-4 rounded-full text-2xl font-bold"
          >
            <h3>Verify</h3>
          </button>
        )}

        <div className="flex gap-2 text-lg">
          <p>Can't find your code?</p>
          <button type="button" className="text-blue hover:text-light-blue hover:scale-105 transition-all ease-linear duration-200">
            <h6>Send new code.</h6>
          </button>
        </div>

        <div>
          <button
            type="button"
            className="flex items-center gap-4"
            onClick={() => navigate("/login")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <h6>Back to Login</h6>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationTokenInput;

