interface params {
  bladeMaterial: string;
  editable: boolean;
}

const BladeMaterialEditAndDisplay = ({ bladeMaterial, editable }: params) => {
  if (editable) {
    return (
      <div>
        <h2>Blade Material: {bladeMaterial}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blade Material: {bladeMaterial}</h2>
      </div>
    );
  }
};

export default BladeMaterialEditAndDisplay;
