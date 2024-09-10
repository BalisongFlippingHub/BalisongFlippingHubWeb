import { useEffect, useState } from "react";

interface params {
  setIsFavoriteFlipperOnChange: Function;
  parentIsFavoriteFlipper: boolean;
}

const FavoriteFlipperInput = ({
  setIsFavoriteFlipperOnChange,
  parentIsFavoriteFlipper,
}: params) => {
  const [isFavoriteFlipper, setIsFavoriteFlipper] = useState(
    parentIsFavoriteFlipper
  );

  const handleOnChange = () => {
    setIsFavoriteFlipperOnChange();
    setIsFavoriteFlipper((prev) => !prev);
  };

  useEffect(() => {
    setIsFavoriteFlipper(parentIsFavoriteFlipper);
  }, [parentIsFavoriteFlipper]);

  return (
    <div className="flex flex-col justify-evenly">
      <label className="font-bold text-lg">Mark as Favorite Flipper:</label>
      {parentIsFavoriteFlipper ? (
        <input
          defaultChecked
          type="checkbox"
          onClick={() => handleOnChange()}
        />
      ) : (
        <input type="checkbox" onClick={() => handleOnChange()} />
      )}
    </div>
  );
};

export default FavoriteFlipperInput;
