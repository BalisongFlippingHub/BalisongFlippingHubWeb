import { useRef, useState } from "react";
import { bladeStyle } from "../../comboBoxData/BladeStyle";

interface params {
  setBladeStyleOnChange: Function;
  parentBladeStyle: string;
}

const BladeStyleInput = ({
  setBladeStyleOnChange,
  parentBladeStyle,
}: params) => {
  const bladeStyleRef = useRef<HTMLSelectElement>(null);

  const [bladeStyleState, setBladeStyleState] = useState(parentBladeStyle);

  const handleOnChange = (value: string) => {
    setBladeStyleState(value);
    setBladeStyleOnChange(value);
    bladeStyleRef.current?.blur();
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="font-bold text-lg">Blade Style:</label>

      <select
        className="bg-shadow-green text-lg p-2 border-2 border-black rounded"
        id="bladeStyleList"
        ref={bladeStyleRef}
        value={bladeStyleState}
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {bladeStyle.map((value, i) => {
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

export default BladeStyleInput;
