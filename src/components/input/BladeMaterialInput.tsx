import { useRef, useState } from "react";
import { bladeMaterial } from "../../comboBoxData/BladeMaterial";

interface params {
  setBladeMaterialOnChange: Function;
  parentBladeMaterial: string;
}

const BladeMaterialInput = ({
  setBladeMaterialOnChange,
  parentBladeMaterial,
}: params) => {
  const bladeMaterialRef = useRef<HTMLSelectElement>(null);

  const [bladeMaterialState, setBladeMaterialState] =
    useState(parentBladeMaterial);

  const handleOnChange = (value: string) => {
    setBladeMaterialState(value);
    setBladeMaterialOnChange(value);
    bladeMaterialRef.current?.blur();
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="text-lg font-bold">Blade Material:</label>

      <select
        className="bg-shadow-green text-lg p-2 border-2 border-black rounded"
        id="bladeMaterialList"
        ref={bladeMaterialRef}
        value={bladeMaterialState}
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {bladeMaterial.map((value, i) => {
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

export default BladeMaterialInput;
