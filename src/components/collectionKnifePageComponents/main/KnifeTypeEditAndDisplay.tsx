interface params {
  knifeType: string;
  editable: boolean;
}

const KnifeTypeEditAndDisplay = ({ knifeType, editable }: params) => {
  if (editable) {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>
          {`(Live blade, Trainer, Both)`} : {knifeType}
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center text-xl font-semibold">
        <p>
          {`(Live blade, Trainer, Both)`} : {knifeType}
        </p>
      </div>
    );
  }
};

export default KnifeTypeEditAndDisplay;
