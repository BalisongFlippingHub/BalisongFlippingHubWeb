interface params {
  displayName: string;
  editable: boolean;
}

const DisplayNameEditAndDisplayName = ({ displayName, editable }: params) => {
  if (editable) {
    return (
      <div className="text-3xl font-bold border-b-2">
        <p>{displayName}</p>
      </div>
    );
  } else {
    return (
      <div className="text-3xl font-bold border-b-2">
        <p>{displayName}</p>
      </div>
    );
  }
};

export default DisplayNameEditAndDisplayName;
