import { useRef, useState } from "react";
import { latchType } from "../../comboBoxData/LatchType";

interface params {
  setLatchTypeOnChange: Function;
  parentLatchType: string;
}

const LatchTypeInput = ({ setLatchTypeOnChange, parentLatchType }: params) => {
  const latchTypeRef = useRef<HTMLSelectElement>(null);
  const [lType, setlType] = useState(parentLatchType);

  const handleOnChange = (value: string) => {
    setlType(value);
    setLatchTypeOnChange(value);
    latchTypeRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Latch Type</label>
      <select
        ref={latchTypeRef}
        value={lType}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {latchType.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default LatchTypeInput;
