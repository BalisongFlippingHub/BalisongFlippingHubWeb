import { useEffect, useState } from "react";

interface params {
  setBalanceOnChange: Function;
  setHasModulatedBalanceOnChange: Function;
  parentHasModulatedBalance: boolean;
  parentBalanceValue: Number | null;
}

const KnifeBalanceInput = ({
  setBalanceOnChange,
  setHasModulatedBalanceOnChange,
  parentBalanceValue,
  parentHasModulatedBalance,
}: params) => {
  const [balance, setBalance] = useState("3");
  const [hasModulatedBalance, setHasModulatedBalance] = useState(
    parentHasModulatedBalance
  );

  const handleOnModulatedBalanceChange = () => {
    setHasModulatedBalance((prev) => !prev);

    if (!hasModulatedBalance) {
      setBalanceOnChange(null);
    } else {
      setBalanceOnChange(balance);
    }

    setHasModulatedBalanceOnChange(!hasModulatedBalance);
  };

  const handleOnChange = (value: string) => {
    setBalance(value);
    setBalanceOnChange(value);
  };

  useEffect(() => {
    if (parentBalanceValue) {
      setBalance(parentBalanceValue.toString());
    }
  }, []);

  return (
    <div className="flex flex-col w-5/6 items-center gap-4">
      <div className="flex flex-col">
        <label className="font-bold text-lg">
          Does knife have a modular balance system?
        </label>

        <div className="flex justify-around">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg">Yes</label>
            {hasModulatedBalance ? (
              <input
                type="radio"
                defaultChecked
                name="yes/no"
                onChange={() => handleOnModulatedBalanceChange()}
              />
            ) : (
              <input
                type="radio"
                name="yes/no"
                onChange={() => handleOnModulatedBalanceChange()}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg">No</label>
            {hasModulatedBalance ? (
              <input
                type="radio"
                name="yes/no"
                onChange={() => handleOnModulatedBalanceChange()}
              />
            ) : (
              <input
                type="radio"
                defaultChecked
                name="yes/no"
                onChange={() => handleOnModulatedBalanceChange()}
              />
            )}
          </div>
        </div>
      </div>

      {!hasModulatedBalance ? (
        <div className="w-full flex flex-col items-center gap-2">
          <span className="h-10 w-1 bg-white rounded"></span>
          <label className="text-lg font-bold">
            Where is the blanace point?
          </label>
          <input
            type="range"
            min="0"
            max="6"
            className="w-full"
            list="balancePoint"
            value={balance}
            onChange={(e) => handleOnChange(e.target.value)}
          />

          <datalist
            id="balancePoint"
            className="flex flex-col justify-between w-full [writing-mode:vertical-lr] mt-2 text-2xl"
          >
            <option value="0" label="Heavy Blade Bias"></option>
            <option value="1" label="Blade Bias"></option>
            <option value="2" label="Moderate Blade Bias"></option>
            <option value="3" label="Neutral"></option>
            <option value="4" label="Moderate Handle Bias"></option>
            <option value="5" label="Handle Bias"></option>
            <option value="6" label="Heavy Handle Bias"></option>
          </datalist>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default KnifeBalanceInput;
