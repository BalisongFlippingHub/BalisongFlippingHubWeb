interface params {
  personalRating: number;
  editable: boolean;
}

const PersonalRatingDisplayAndToggle = ({
  personalRating,
  editable,
}: params) => {
  if (editable) {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Personal Rating : {personalRating}/10</p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Personal Rating : {personalRating}/10</p>
      </div>
    );
  }
};

export default PersonalRatingDisplayAndToggle;
