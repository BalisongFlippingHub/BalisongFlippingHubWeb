interface params {
  bladeType: string;
  editable: boolean;
}

const BladeTypeEditAndDisplay = ({ bladeType, editable }: params) => {
  if (editable) {
    return (
      <div>
        <h2>Blade Type: {bladeType}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blade Type: {bladeType}</h2>
      </div>
    );
  }
};

export default BladeTypeEditAndDisplay;
