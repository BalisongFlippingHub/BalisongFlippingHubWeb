import { useEffect, useState } from "react";

interface params {
  setIsFavoriteFlipperOnChange: Function;
  parentIsFavoriteFlipper: boolean;
}

const FavoriteFlipperInput = ({
  setIsFavoriteFlipperOnChange,
  parentIsFavoriteFlipper,
}: params) => {
  const [_isFavoriteFlipper, setIsFavoriteFlipper] = useState(
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
    <button
      type="button"
      onClick={() => handleOnChange()}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors duration-200 ${
        parentIsFavoriteFlipper
          ? "bg-blue-primary/10 border-blue-primary/40 text-blue-primary"
          : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{parentIsFavoriteFlipper ? "♦" : "◇"}</span>
        <span className="text-sm font-medium">Favorite Flipper</span>
      </div>
      <div className={`w-9 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0 ${
        parentIsFavoriteFlipper ? "bg-blue-primary" : "bg-white/10"
      }`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
          parentIsFavoriteFlipper ? "left-[18px]" : "left-0.5"
        }`} />
      </div>
    </button>
  );
};

export default FavoriteFlipperInput;
