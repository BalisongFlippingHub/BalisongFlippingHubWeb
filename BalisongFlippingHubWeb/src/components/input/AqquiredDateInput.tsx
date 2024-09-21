import { useEffect, useState } from "react";

interface params {
  setAqquiredDateOnChange: Function;
  parentAqquiredDate: string;
}

const AqquiredDateInput = ({
  setAqquiredDateOnChange,
  parentAqquiredDate,
}: params) => {
  const [selectedDate, setSelectedDate] = useState(parentAqquiredDate);

  const handleOnChange = (value: string) => {
    setSelectedDate(value);
    setAqquiredDateOnChange(value);
  };

  useEffect(() => {
    setSelectedDate(parentAqquiredDate);
  }, [parentAqquiredDate]);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-lg">Date Aqquired:</label>
      <input
        type="date"
        value={selectedDate}
        required
        onChange={(e) => handleOnChange(e.target.value)}
        className="bg-shadow-green p-2 outline-none border border-black rounded"
      />
    </div>
  );
};

export default AqquiredDateInput;
