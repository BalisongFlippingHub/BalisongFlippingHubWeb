import { useRef, useState } from "react";
import { handleFinish } from "../comboBoxData/HandleFinish";

interface params {
  setHandleFinishOnChange: Function;
  parentHandleFinish: string;
}

const HandleFinishInput = ({
  setHandleFinishOnChange,
  parentHandleFinish,
}: params) => {
  const handleFinishRef = useRef<HTMLSelectElement>(null);

  const [handleFinishState, setHandleFinishState] =
    useState(parentHandleFinish);

  const handleOnChange = (value: string) => {
    setHandleFinishState(value);
    setHandleFinishOnChange(value);
    handleFinishRef.current?.blur();
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="text-lg font-bold">Handle Finish:</label>

      <select
        className="bg-shadow-green text-lg p-2 border-2 border-black rounded"
        id="handleFinishList"
        ref={handleFinishRef}
        value={handleFinishState}
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {handleFinish.map((value, i) => {
          return (
            <option className="" key={i} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default HandleFinishInput;
