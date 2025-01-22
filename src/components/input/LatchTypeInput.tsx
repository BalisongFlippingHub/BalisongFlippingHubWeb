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
    <div className="flex gap-2 items-center">
      <label className="font-bold text-lg">Latch Type:</label>

      <select
        id="latchTypeList"
        value={lType}
        ref={latchTypeRef}
        className="bg-shadow-green text-lg p-2 border-2 border-black rounded"
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {latchType.map((value, i) => {
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

export default LatchTypeInput;
