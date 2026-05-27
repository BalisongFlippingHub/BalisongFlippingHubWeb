import { useEffect, useState } from "react";

interface params {
  setKnifeMakerOnChange: Function;
  parentKnifeMaker: string;
}

const KnifeMakerInput = ({ setKnifeMakerOnChange, parentKnifeMaker }: params) => {
  const [knifeMaker, setKnifeMaker] = useState(parentKnifeMaker);

  const handleOnChange = (value: string) => {
    setKnifeMaker(value);
    setKnifeMakerOnChange(value);
  };

  useEffect(() => { setKnifeMaker(parentKnifeMaker); }, [parentKnifeMaker]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">
        Maker
      </label>
      <input
        type="text"
        required
        value={knifeMaker}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder="e.g. Benchmade"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 placeholder:text-white/20"
      />
    </div>
  );
};

export default KnifeMakerInput;
