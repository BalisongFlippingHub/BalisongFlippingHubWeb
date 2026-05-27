import { useRef, useState } from "react";
import { bladeFinish } from "../../comboBoxData/BladeFinish";

interface params {
  setBladeFinishOnChange: Function;
  parentBladeFinish: string;
}

const BladeFinishInput = ({ setBladeFinishOnChange, parentBladeFinish }: params) => {
  const bladeFinishRef = useRef<HTMLSelectElement>(null);
  const [bladeFinishState, setBladeFinishState] = useState(parentBladeFinish);

  const handleOnChange = (value: string) => {
    setBladeFinishState(value);
    setBladeFinishOnChange(value);
    bladeFinishRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Blade Finish</label>
      <select
        ref={bladeFinishRef}
        value={bladeFinishState}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {bladeFinish.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default BladeFinishInput;
