import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const CollectionKnifeDisplay = () => {
  return (
    <section className="lg:pl-[192px] pt-[64px] w-full flex flex-col items-center">
      {/*Go Back Btn*/}
      <div className="w-full p-10">
        <button
          type="button"
          className="text-xl font-bold bg-shadow p-4 rounded hover:bg-shadow-green-offset flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <h4>Back To Collection</h4>
        </button>
      </div>

      {/*Main Display*/}
      <div className="flex flex-col items-center bg-black max-w-[1000px] w-full h-20 mt-20 p-4 rounded">
        <h1>Random Knife</h1>
      </div>
    </section>
  );
};

export default CollectionKnifeDisplay;
