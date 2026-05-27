import { useRef, useState } from "react";

interface params {
  setKnifeWeightOnChange: Function;
  parentWeight: string;
}

const KnifeWeightInput = ({ setKnifeWeightOnChange, parentWeight }: params) => {
  const weightInputRef = useRef<HTMLInputElement>(null);
  const [weight, setWeight]         = useState(parentWeight);
  const [weightType, setWeightType] = useState("oz");

  const checkDecimalValue = (value: string) => {
    let i = value.indexOf(".");
    if (value[i + 2] === "0") return (+value).toFixed(1).toString();
    return value;
  };

  const onWeightChange = (value: string) => {
    setWeight(value);
    setKnifeWeightOnChange(
      weightType !== "oz"
        ? checkDecimalValue((+value / 28.35).toFixed(2).toString())
        : checkDecimalValue((+value).toFixed(2).toString())
    );
  };

  const onWeightTypeChange = (value: string) => {
    if (weightType !== "oz" && weight !== "") setWeight((prev) => checkDecimalValue((+prev / 28.35).toFixed(2).toString()));
    if (weightType !== "g"  && weight !== "") setWeight((prev) => checkDecimalValue((+prev * 28.35).toFixed(2).toString()));
    setWeightType(value);
  };

  const handleOnBlur = () => {
    if (weight !== checkDecimalValue((+weight).toFixed(2).toString()))
      setWeight((prev) => checkDecimalValue((+prev).toFixed(2).toString()));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Weight</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          ref={weightInputRef}
          value={weight}
          placeholder="0.0"
          onChange={(e) => onWeightChange(e.target.value)}
          onBlur={handleOnBlur}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {["oz", "g"].map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => onWeightTypeChange(unit)}
              className={`px-2.5 py-2 text-xs font-medium transition-colors duration-150 ${
                weightType === unit
                  ? "bg-blue-primary text-white"
                  : "bg-white/5 text-white/40 hover:text-white/70"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnifeWeightInput;
