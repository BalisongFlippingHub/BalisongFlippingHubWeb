import { useEffect, useState } from "react";

interface params {
  setBaseKnifeModelOnChange: Function;
  parentBaseKnifeModel: string;
}

const BaseKnifeModelInput = ({ setBaseKnifeModelOnChange, parentBaseKnifeModel }: params) => {
  const [baseKnifeModel, setBaseKnifeModel] = useState(parentBaseKnifeModel);

  const handleOnChange = (value: string) => {
    setBaseKnifeModel(value);
    setBaseKnifeModelOnChange(value);
  };

  useEffect(() => { setBaseKnifeModel(parentBaseKnifeModel); }, [parentBaseKnifeModel]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">
        Base Model
      </label>
      <input
        type="text"
        required
        value={baseKnifeModel}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder="e.g. 51"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/20"
      />
    </div>
  );
};

export default BaseKnifeModelInput;
