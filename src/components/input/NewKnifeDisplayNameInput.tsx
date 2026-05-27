import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

interface params {
  setDisplayNameOnChange: Function;
  parentDisplayName: string;
}

const NewKnifeDisplayNameInput = ({ setDisplayNameOnChange, parentDisplayName }: params) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName]       = useState("");
  const [isDuplicateName, setIsDuplicateName] = useState(false);

  const collectedKnives = useAppSelector((state) => state.collection.collectionKnives);

  const handleOnChange = (value: string) => {
    setDisplayName(value);
    setDisplayNameOnChange(value);
  };

  useEffect(() => { setDisplayName(parentDisplayName); }, [parentDisplayName]);

  useEffect(() => {
    setIsDuplicateName(!!collectedKnives.find((obj) => obj.displayName === displayName));
  }, [displayName]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <label className="text-xs text-white/50 font-medium uppercase tracking-wide">
          Display Name
        </label>
        {isDuplicateName && (
          <span className="text-xs text-red font-medium">Name already in use</span>
        )}
      </div>
      <input
        type="text"
        required
        value={displayName}
        ref={inputRef}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder="e.g. My Benchmade 51"
        className={`w-full bg-white/5 border rounded-lg px-3 py-2 text-white text-sm outline-none transition-colors duration-200 placeholder:text-white/20 ${
          isDuplicateName
            ? "border-red/50 focus:border-red/70"
            : "border-white/10 focus:border-blue-primary/50"
        }`}
      />
    </div>
  );
};

export default NewKnifeDisplayNameInput;
