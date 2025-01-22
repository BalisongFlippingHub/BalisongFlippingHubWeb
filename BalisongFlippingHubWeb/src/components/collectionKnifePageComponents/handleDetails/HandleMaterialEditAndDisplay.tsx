interface params {
  handleMaterial: string;
  editable: boolean;
}

const HandleMaterialEditAndDisplay = ({ handleMaterial, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full text-lg font-semibold">
        <h2>Handle Material: {handleMaterial}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Handle Material: {handleMaterial}</h2>
      </div>
    );
  }
};

export default HandleMaterialEditAndDisplay;
