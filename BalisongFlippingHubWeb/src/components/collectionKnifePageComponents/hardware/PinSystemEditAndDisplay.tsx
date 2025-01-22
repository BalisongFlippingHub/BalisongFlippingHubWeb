interface params {
  pinSystem: string;
  editable: boolean;
}

const PinSystemEditAndDisplay = ({ pinSystem, editable }: params) => {
  console.log(pinSystem);
  if (editable) {
    return (
      <div>
        <h2>Pin System: {pinSystem}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Pin System: {pinSystem}</h2>
      </div>
    );
  }
};

export default PinSystemEditAndDisplay;
