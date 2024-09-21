import { useEffect, useState } from "react";

interface params {
  setDisplayNameOnChange: Function;
  parentDisplayName: string;
}

const NewKnifeDisplayNameInput = ({
  setDisplayNameOnChange,
  parentDisplayName,
}: params) => {
  const [displayName, setDisplayName] = useState("");

  const handleOnChange = (value: string) => {
    setDisplayName(value);
    setDisplayNameOnChange(value);
  };

  useEffect(() => {
    setDisplayName(parentDisplayName);
  }, [parentDisplayName]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg font-bold">Display Name:</label>
      <input
        type="text"
        required
        value={displayName}
        onChange={(e) => handleOnChange(e.target.value)}
        className="p-1 rounded bg-shadow-green border-2 border-black text-lg outline-none font-semibold"
      />
    </div>
  );
};

export default NewKnifeDisplayNameInput;
