interface params {
  overallLength: string;
  editable: boolean;
}

const OverallLengthEditAndDisplay = ({ overallLength, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full text-lg font-semibold">
        <h2>Overall Length: {overallLength} in</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Overall Length: {overallLength} in</h2>
      </div>
    );
  }
};

export default OverallLengthEditAndDisplay;
