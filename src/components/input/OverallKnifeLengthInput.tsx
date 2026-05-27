import { useRef, useState } from "react";

interface params {
  setOverallLengthOnChange: Function;
  parentKnifeLength: string;
}

const OverallKnifeLengthInput = ({ setOverallLengthOnChange, parentKnifeLength }: params) => {
  const lengthInputRef = useRef<HTMLInputElement>(null);
  const [measureType, setMeasureType] = useState("In");
  const [length, setLength] = useState(parentKnifeLength);

  const overallLengthOnChange = (value: string) => {
    setLength(value);
    setOverallLengthOnChange(
      measureType !== "In"
        ? (+value / 12).toFixed(1).toString()
        : (+value).toFixed(1).toString()
    );
  };

  const onMeasureTypeChange = (value: string) => {
    if (measureType !== "In" && length !== "") setLength((prev) => (+prev / 12).toFixed(1).toString());
    if (measureType !== "cm" && length !== "") setLength((prev) => (+prev * 12).toFixed(0).toString());
    setMeasureType(value);
  };

  const handleOnBlur = () => {
    setLength((prev) =>
      measureType === "In" ? (+prev).toFixed(1).toString() : (+prev).toFixed(0).toString()
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Overall Length</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          ref={lengthInputRef}
          value={length}
          placeholder={measureType === "In" ? "0.0" : "0"}
          onChange={(e) => overallLengthOnChange(e.target.value)}
          onBlur={handleOnBlur}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {["In", "cm"].map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => onMeasureTypeChange(unit)}
              className={`px-2.5 py-2 text-xs font-medium transition-colors duration-150 ${
                measureType === unit
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

export default OverallKnifeLengthInput;
