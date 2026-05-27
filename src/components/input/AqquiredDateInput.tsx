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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/50 font-medium uppercase tracking-wide">Date Acquired</label>
      <input
        type="date"
        value={selectedDate}
        required
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-full bg-[#1c1f27] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 cursor-pointer [color-scheme:dark]"
      />
    </div>
  );
};

export default AqquiredDateInput;
