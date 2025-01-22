interface params {
  handleFinish: string;
  editable: boolean;
}

const HandleFinishEditAndDisplay = ({ handleFinish, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full text-lg font-semibold">
        <h2>Handle Finish: {handleFinish}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Handle Finish: {handleFinish}</h2>
      </div>
    );
  }
};

export default HandleFinishEditAndDisplay;
