import { useRef, useState } from "react";
import { pinSystem } from "../../comboBoxData/PinSystem";

interface params {
  setPinSystemOnChange: Function;
  parentPinSystem: string;
}

const PinSystemInput = ({ setPinSystemOnChange, parentPinSystem }: params) => {
  const pinSystemRef = useRef<HTMLSelectElement>(null);
  const [pSystem, setPSystem] = useState(parentPinSystem);

  const handleOnChange = (value: string) => {
    setPSystem(value);
    setPinSystemOnChange(value);
    pinSystemRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Pin System</label>
      <select
        ref={pinSystemRef}
        value={pSystem}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {pinSystem.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default PinSystemInput;
