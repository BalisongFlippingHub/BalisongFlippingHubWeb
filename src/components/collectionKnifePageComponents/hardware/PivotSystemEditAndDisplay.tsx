interface params {
  pivotSystem: string;
  editable: boolean;
}

const PivotSystemEditAndDisplay = ({ pivotSystem, editable }: params) => {
  if (editable) {
    return (
      <div>
        <h2>Pivot System: {pivotSystem}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Pivot System: {pivotSystem}</h2>
      </div>
    );
  }
};

export default PivotSystemEditAndDisplay;
