import Image from "../../Image";

interface params {
  coverPhoto: string;
  editable: boolean;
}

const CoverPhotoEditAndDisplay = ({ coverPhoto, editable }: params) => {
  if (editable) {
    return (
      <div className="w-96 h-96 rounded-full overflow-hidden border">
        <Image imageId={coverPhoto} />
      </div>
    );
  } else {
    return (
      <div className="w-96 h-96 rounded-full overflow-hidden border">
        <Image imageId={coverPhoto} />
      </div>
    );
  }
};

export default CoverPhotoEditAndDisplay;
