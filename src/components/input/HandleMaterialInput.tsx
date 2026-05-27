import { useRef, useState } from "react";
import { handleMaterial } from "../../comboBoxData/HandleMaterial";

interface params {
  setHandleMaterialOnChange: Function;
  parentHandleMaterial: string;
}

const HandleMaterialInput = ({
  setHandleMaterialOnChange,
  parentHandleMaterial,
}: params) => {
  const handleMaterialRef = useRef<HTMLSelectElement>(null);

  const [handleMaterialState, setHandleMaterialState] =
    useState(parentHandleMaterial);

  const handleOnChange = (value: string) => {
    setHandleMaterialState(value);
    setHandleMaterialOnChange(value);
    handleMaterialRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Handle Material</label>
      <select
        id="handleMaterialList"
        ref={handleMaterialRef}
        value={handleMaterialState}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      >
        {handleMaterial.map((value, i) => (
          <option key={i} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default HandleMaterialInput;
