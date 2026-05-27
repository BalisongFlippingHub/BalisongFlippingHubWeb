import { useRef, useState } from "react";
import { bladeStyle } from "../../comboBoxData/BladeStyle";

interface params {
  setBladeStyleOnChange: Function;
  parentBladeStyle: string;
}

const BladeStyleInput = ({ setBladeStyleOnChange, parentBladeStyle }: params) => {
  const bladeStyleRef = useRef<HTMLSelectElement>(null);
  const [bladeStyleState, setBladeStyleState] = useState(parentBladeStyle);

  const handleOnChange = (value: string) => {
    setBladeStyleState(value);
    setBladeStyleOnChange(value);
    bladeStyleRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Blade Style</label>
      <select
        ref={bladeStyleRef}
        value={bladeStyleState}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {bladeStyle.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default BladeStyleInput;
