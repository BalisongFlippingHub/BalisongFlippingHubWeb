import { useRef, useState } from "react";
import { pivotSystem } from "../../comboBoxData/PivotSystem";

interface params {
  setPivotSystemOnChange: Function;
  parentPivotSystem: string;
}

const PivotSystemInput = ({ setPivotSystemOnChange, parentPivotSystem }: params) => {
  const pivotSystemRef = useRef<HTMLSelectElement>(null);
  const [pSystem, setPSystem] = useState(parentPivotSystem);

  const handleOnChange = (value: string) => {
    setPSystem(value);
    setPivotSystemOnChange(value);
    pivotSystemRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Pivot System</label>
      <select
        ref={pivotSystemRef}
        value={pSystem}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {pivotSystem.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default PivotSystemInput;
