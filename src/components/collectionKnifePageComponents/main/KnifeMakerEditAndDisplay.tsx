interface params {
  knifeMaker: string;
  editable: boolean;
}

const KnifeMakerEditAndDisplay = ({ knifeMaker, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Knife Maker : {knifeMaker}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Knife Maker : {knifeMaker}</p>
      </div>
    );
  }
};

export default KnifeMakerEditAndDisplay;
