import { useState } from "react";

interface params {
  setKnifeMSRPOnChange: Function;
  parentMSRP: string;
}

const KnifeMSRPInput = ({ setKnifeMSRPOnChange, parentMSRP }: params) => {
  const [msrp, setMsrp] = useState(parentMSRP);

  const msrpOnChange = (value: string) => {
    setMsrp(value);
    setKnifeMSRPOnChange((+value).toFixed(2).toString());
  };

  return (
    <div className="flex p-2 gap-2 items-center">
      <label className="text-lg font-bold">MSRP: </label>

      <div className="relative">
        <input
          type="number"
          className="bg-shadow-green border-2 border-black pl-5 w-24 text-lg rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => msrpOnChange(e.target.value)}
          onBlur={() => setMsrp((prev) => (+prev).toFixed(2).toString())}
          value={msrp}
          placeholder="0.00"
        />

        <p className="absolute top-1 left-2">$</p>
      </div>

      <div className="font-semibold">*USD</div>
    </div>
  );
};

export default KnifeMSRPInput;
