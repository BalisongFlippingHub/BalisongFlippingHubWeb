interface params {
  bladeFinish: string;
  editable: boolean;
}

const BladeFinishEditAndDisplay = ({ bladeFinish, editable }: params) => {
  if (editable) {
    return (
      <div>
        <h2>Blade Finish: {bladeFinish}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blade Finish: {bladeFinish}</h2>
      </div>
    );
  }
};

export default BladeFinishEditAndDisplay;
