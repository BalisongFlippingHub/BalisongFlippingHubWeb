import { useRef, useState } from "react";

interface params {
  setOverallLengthOnChange: Function;
  parentKnifeLength: string;
}

const OverallKnifeLengthInput = ({
  setOverallLengthOnChange,
  parentKnifeLength,
}: params) => {
  const lengthInputRef = useRef<HTMLInputElement>(null);

  const [measureType, setMeasureType] = useState("In");
  const [length, setLength] = useState(parentKnifeLength);

  const overallLengthOnChange = (value: string) => {
    setLength(value);
    if (measureType !== "In") {
      setOverallLengthOnChange((+value / 12).toFixed(1).toString());
    } else {
      setOverallLengthOnChange((+value).toFixed(1).toString());
    }
  };

  const onMeasureTypeChange = (value: string) => {
    if (measureType !== "In") {
      if (length !== "")
        setLength((prev) => (+prev / 12).toFixed(1).toString());
    }

    if (measureType !== "cm") {
      if (length !== "")
        setLength((prev) => (+prev * 12).toFixed(0).toString());
    }
    setMeasureType(value);
  };

  const handleOnBlur = () => {
    if (measureType === "In") {
      setLength((prev) => (+prev).toFixed(1).toString());
    } else {
      setLength((prev) => (+prev).toFixed(0).toString());
    }
  };

  return (
    <div className="flex gap-2 p-2 items-center">
      <label className="text-lg font-bold">Overall Length:</label>
      <input
        type="number"
        ref={lengthInputRef}
        value={length}
        placeholder={measureType === "In" ? "0.0" : "0"}
        className="bg-shadow-green p-1 text-lg border-2 border-black w-16 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        onChange={(e) => overallLengthOnChange(e.target.value)}
        onBlur={() => handleOnBlur()}
      />

      <div className="flex gap-4 items-center">
        <div className="flex gap-1">
          <input
            type="radio"
            name="overall-cm/overall-in"
            defaultChecked
            value="In"
            onChange={(e) => onMeasureTypeChange(e.target.value)}
          />
          <label className="font-semibold text-lg">In</label>
        </div>

        <div className="flex gap-1">
          <input
            type="radio"
            name="overall-cm/overall-in"
            value="cm"
            onChange={(e) => onMeasureTypeChange(e.target.value)}
          />
          <label className="font-semibold text-lg">cm</label>
        </div>
      </div>
    </div>
  );
};

export default OverallKnifeLengthInput;
