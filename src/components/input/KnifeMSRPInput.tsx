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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">
        MSRP <span className="normal-case tracking-normal text-white/25">(USD)</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">$</span>
        <input
          type="number"
          value={msrp}
          placeholder="0.00"
          onChange={(e) => msrpOnChange(e.target.value)}
          onBlur={() => setMsrp((prev) => (+prev).toFixed(2).toString())}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
};

export default KnifeMSRPInput;
