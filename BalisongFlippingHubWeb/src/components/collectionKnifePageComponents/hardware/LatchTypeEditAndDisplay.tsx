interface params {
  latchType: string;
  editable: boolean;
}

const LatchTypeEditAndDisplay = ({ latchType, editable }: params) => {
  if (editable) {
    return (
      <div>
        <h2>Latch Type: {latchType}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Latch Type: {latchType}</h2>
      </div>
    );
  }
};

export default LatchTypeEditAndDisplay;
