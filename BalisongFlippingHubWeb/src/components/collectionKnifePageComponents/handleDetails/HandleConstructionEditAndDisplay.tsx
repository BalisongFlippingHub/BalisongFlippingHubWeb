interface params {
  handleConstruction: string;
  editable: boolean;
}

const HandleConstructionEditAndDisplay = ({
  handleConstruction,
  editable,
}: params) => {
  if (editable) {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Handle Construction : {handleConstruction}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Handle Construction : {handleConstruction}</p>
      </div>
    );
  }
};

export default HandleConstructionEditAndDisplay;
