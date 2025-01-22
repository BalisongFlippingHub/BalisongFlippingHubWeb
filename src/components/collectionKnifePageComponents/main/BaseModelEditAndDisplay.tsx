interface params {
  baseModel: string;
  editable: boolean;
}

const BaseModelEditAndDisplay = ({ baseModel, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Base Model : {baseModel}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>Base Model : {baseModel}</p>
      </div>
    );
  }
};

export default BaseModelEditAndDisplay;
