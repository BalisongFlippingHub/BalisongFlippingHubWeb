import { useEffect, useState } from "react";

interface params {
  setIsFavoriteKnifeOnChange: Function;
  parentIsFavoriteKnife: boolean;
}

const FavoriteKnifeInput = ({
  setIsFavoriteKnifeOnChange,
  parentIsFavoriteKnife,
}: params) => {
  const [isFavoriteKnife, setIsFavoriteKnife] = useState(parentIsFavoriteKnife);

  const handleOnChange = () => {
    setIsFavoriteKnifeOnChange();
    setIsFavoriteKnife((prev) => !prev);
  };

  useEffect(() => {
    setIsFavoriteKnife(parentIsFavoriteKnife);
  }, [parentIsFavoriteKnife]);

  return (
    <div className="flex flex-col justify-evenly">
      <label className="text-lg font-bold">Mark as Favorite Knife:</label>
      {parentIsFavoriteKnife ? (
        <input
          type="checkbox"
          defaultChecked
          onClick={() => handleOnChange()}
        />
      ) : (
        <input type="checkbox" onClick={() => handleOnChange()} />
      )}
    </div>
  );
};

export default FavoriteKnifeInput;
