interface params {
  knifeWeight: string;
  editable: boolean;
}

const KnifeWeightEditAndDisplay = ({ knifeWeight, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full text-lg font-semibold">
        <h2>Weight: {knifeWeight}oz</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Weight: {knifeWeight}oz</h2>
      </div>
    );
  }
};

export default KnifeWeightEditAndDisplay;
