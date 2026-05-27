import { useRef, useState } from "react";
import { handleFinish } from "../../comboBoxData/HandleFinish";

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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Handle Finish</label>
      <select
        id="handleFinishList"
        ref={handleFinishRef}
        value={handleFinishState}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {handleFinish.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default HandleFinishInput;
