import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

interface params {
  setDisplayNameOnChange: Function;
  parentDisplayName: string;
}

const NewKnifeDisplayNameInput = ({
  setDisplayNameOnChange,
  parentDisplayName,
}: params) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [isDuplicateName, setIsDuplicateName] = useState(false);

  const collectedKnives = useAppSelector(
    (state) => state.collection.collectionKnives
  );

  const handleOnChange = (value: string) => {
    setDisplayName(value);
    setDisplayNameOnChange(value);
  };

  useEffect(() => {
    setDisplayName(parentDisplayName);
  }, [parentDisplayName]);

  useEffect(() => {
    if (collectedKnives.find((obj) => obj.displayName === displayName)) {
      // check for display name being equal to another display name
      setIsDuplicateName(true);
    } else {
      setIsDuplicateName(false);
    }
  }, [displayName]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-4 items-center">
        <label className="text-lg font-bold">Display Name:</label>
        {isDuplicateName ? (
          <p className="font-semibold text-red">Display Name already used.</p>
        ) : (
          <></>
        )}
      </div>

      <input
        type="text"
        required
        value={displayName}
        ref={inputRef}
        onChange={(e) => handleOnChange(e.target.value)}
        className="p-1 rounded bg-shadow-green border-2 border-black text-lg outline-none font-semibold"
      />
    </div>
  );
};

export default NewKnifeDisplayNameInput;
