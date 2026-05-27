import { useRef, useState } from "react";
import { handleConstruction } from "../../comboBoxData/HandleConstruction";

interface params {
  setHandleConstructionOnChange: Function;
  parentHandleConstruction: string;
}

const HandleConstructionInput = ({
  setHandleConstructionOnChange,
  parentHandleConstruction,
}: params) => {
  const handleConstructionRef = useRef<HTMLSelectElement>(null);

  const [handleConstructionState, setHandleConstructionState] = useState(
    parentHandleConstruction
  );

  const handleOnChange = (value: string) => {
    setHandleConstructionState(value);
    setHandleConstructionOnChange(value);
    handleConstructionRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Handle Construction</label>
      <select
        id="handleConstructionList"
        ref={handleConstructionRef}
        value={handleConstructionState}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {handleConstruction.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default HandleConstructionInput;
