import { useEffect, useState } from "react";
import Image from "../../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface params {
  files: Array<string>;
}

const CollectionTimelineFilesDisplay = ({ files }: params) => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const goLeft = () => {
    if (currIndex === 0) setCurrIndex(files.length - 1);
    else setCurrIndex((prev) => --prev);
  };

  const goRight = () => {
    if (currIndex === files.length - 1) setCurrIndex(0);
    else setCurrIndex((prev) => ++prev);
  };

  useEffect(() => {
    // TODO- stop videos from playing once index changes away
  }, [currIndex]);

  return (
    <div className="w-full h-80 relative">
      {files.map((file, i) => {
        return (
          <div
            key={i}
            className={
              currIndex === i
                ? "w-full h-full overflow-hidden"
                : "absolute collapse"
            }
          >
            <Image imageId={file} />
          </div>
        );
      })}

      {files.length > 1 ? (
        <>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="hover:cursor-pointer hover:text-4xl bg-shadow p-2 rounded-lg absolute top-1/2 -translate-y-1/2 left-4"
            size="xl"
            onClick={goLeft}
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            className="hover:cursor-pointer hover:text-4xl bg-shadow p-2 rounded-lg absolute right-4 top-1/2 -translate-y-1/2"
            size="xl"
            onClick={goRight}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollectionTimelineFilesDisplay;
