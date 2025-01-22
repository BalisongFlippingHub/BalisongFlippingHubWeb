import { useRef, useState } from "react";

interface params {
  setKnifeWeightOnChange: Function;
  parentWeight: string;
}

const KnifeWeightInput = ({ setKnifeWeightOnChange, parentWeight }: params) => {
  const weightInputRef = useRef<HTMLInputElement>(null);

  const [weight, setWeight] = useState(parentWeight);
  const [weightType, setWeightType] = useState("oz");

  const checkDecimalValue = (value: string) => {
    let i = value.indexOf(".");
    if (value[i + 2] === "0") return (+value).toFixed(1).toString();

    return value;
  };

  const onWeightChange = (value: string) => {
    setWeight(value);
    if (weightType !== "oz") {
      setKnifeWeightOnChange(
        checkDecimalValue((+value / 28.35).toFixed(2).toString())
      );
    } else {
      setKnifeWeightOnChange(checkDecimalValue((+value).toFixed(2).toString()));
    }
  };

  const onWeightTypeChange = (value: string) => {
    if (weightType !== "oz") {
      if (weight !== "")
        setWeight((prev) =>
          checkDecimalValue((+prev / 28.35).toFixed(2).toString())
        );
    }

    if (weightType !== "g") {
      if (weight !== "")
        setWeight((prev) =>
          checkDecimalValue((+prev * 28.35).toFixed(2).toString())
        );
    }
    setWeightType(value);
  };

  const handleOnBlur = () => {
    if (weight !== checkDecimalValue((+weight).toFixed(2).toString()))
      setWeight((prev) => checkDecimalValue((+prev).toFixed(2).toString()));
  };

  return (
    <div className="flex gap-2 p-2 items-center">
      <label className="text-lg font-bold">Weight:</label>
      <input
        type="number"
        ref={weightInputRef}
        value={weight}
        placeholder="0.0"
        className="bg-shadow-green p-1 text-lg border-2 border-black w-32 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        onChange={(e) => onWeightChange(e.target.value)}
        onBlur={() => handleOnBlur()}
      />

      <div className="flex gap-4 items-center">
        <div className="flex gap-1">
          <input
            type="radio"
            name="knife-oz/knife-g"
            defaultChecked
            value="oz"
            onChange={(e) => onWeightTypeChange(e.target.value)}
          />
          <label className="font-semibold text-lg">oz</label>
        </div>

        <div className="flex gap-1">
          <input
            type="radio"
            name="knife-oz/knife-g"
            value="g"
            onChange={(e) => onWeightTypeChange(e.target.value)}
          />
          <label className="font-semibold text-lg">g</label>
        </div>
      </div>
    </div>
  );
};

export default KnifeWeightInput;
