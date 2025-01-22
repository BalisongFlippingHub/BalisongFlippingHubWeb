interface params {
  msrp: string;
  editable: boolean;
}

const MSRPEditAndDisplay = ({ msrp, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>MSRP : ${msrp}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>MSRP : ${msrp}</p>
      </div>
    );
  }
};

export default MSRPEditAndDisplay;
