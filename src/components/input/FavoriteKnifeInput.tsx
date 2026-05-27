import { useEffect, useState } from "react";

interface params {
  setIsFavoriteKnifeOnChange: Function;
  parentIsFavoriteKnife: boolean;
}

const FavoriteKnifeInput = ({
  setIsFavoriteKnifeOnChange,
  parentIsFavoriteKnife,
}: params) => {
  const [_isFavoriteKnife, setIsFavoriteKnife] = useState(
    parentIsFavoriteKnife
  );

  const handleOnChange = () => {
    setIsFavoriteKnifeOnChange();
    setIsFavoriteKnife((prev) => !prev);
  };

  useEffect(() => {
    setIsFavoriteKnife(parentIsFavoriteKnife);
  }, [parentIsFavoriteKnife]);

  return (
    <button
      type="button"
      onClick={() => handleOnChange()}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors duration-200 ${
        parentIsFavoriteKnife
          ? "bg-gold/10 border-gold/40 text-gold"
          : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{parentIsFavoriteKnife ? "★" : "☆"}</span>
        <span className="text-sm font-medium">Favorite Knife</span>
      </div>
      <div className={`w-9 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0 ${
        parentIsFavoriteKnife ? "bg-gold" : "bg-white/10"
      }`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
          parentIsFavoriteKnife ? "left-[18px]" : "left-0.5"
        }`} />
      </div>
    </button>
  );
};

export default FavoriteKnifeInput;
