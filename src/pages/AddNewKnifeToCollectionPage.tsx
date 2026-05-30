import { useState } from "react";
import NewCollectionKnifeForm from "../components/newCollectionKnifeComponents/NewCollectionKnifeForm";
import GalleryInput from "../components/newCollectionKnifeComponents/GalleryInput";
import NewCollectionKnifeSummary from "../components/newCollectionKnifeComponents/NewCollectionKnifeSummary";
import NewCollectionKnifeSubmit from "../components/newCollectionKnifeComponents/NewCollectionKnifeSubmit";
import { CollectionKnifeDTO } from "../modals/CollectionKnife";

const AddNewKnifeToCollectionPage = () => {
  const [newKnifeStep, setNewKnifeStep] = useState("1");
  const [newKnifeObj, setNewKnifeObj] = useState<CollectionKnifeDTO | null>(null);
  const [formNotReady, setFormNotReady] = useState(true);
  const [galleryFiles, setGalleryFiles] = useState<Array<File> | null>(null);

  const setNewKnifeObjOnSubmit = (obj: CollectionKnifeDTO) => {
    setNewKnifeObj(obj);
    setFormNotReady(false);
    setNewKnifeStep((prev) => (+prev + 1).toString());
  };

  const setFormNotReadyOnChange = () => setFormNotReady(true);

  const updateGalleryFiles = (files: Array<File> | null) => {
    setGalleryFiles(files);
  };

  const setStepManually = (num: string) => setNewKnifeStep(num);

  const steps = [
    { num: "1", label: "Form", locked: false },
    { num: "2", label: "Gallery", locked: formNotReady },
    { num: "3", label: "Summary", locked: formNotReady },
    { num: "4", label: "Submit", locked: formNotReady },
  ];

  return (
    <section className="w-full min-h-full lg:pl-[192px] flex flex-col pt-[56px]">

      {/* Step indicator — sticky, aligned to form width */}
      <div className="w-full lg:-ml-[192px] lg:w-[calc(100%+192px)] bg-[#13161d] border-y border-white/10 flex justify-center">
        <div className="w-full max-w-[900px] px-4 py-3 xsm:flex sm:grid sm:grid-cols-4 items-center gap-2">
          {steps.map(({ num, label, locked }, i) => {
            const isActive = newKnifeStep === num;
            const isPast = +newKnifeStep > +num;
            return (
              <div key={num} className="flex items-center gap-2 min-w-0 xsm:flex-1 xsm:justify-center sm:flex-none sm:justify-center">
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => !locked && setNewKnifeStep(num)}
                  className={`flex items-center gap-2 transition-colors duration-150 flex-shrink-0 ${
                    locked ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-primary text-white"
                      : isPast
                      ? "bg-blue-primary/30 text-blue-primary border border-blue-primary/40"
                      : locked
                      ? "bg-white/5 text-white/20 border border-white/10"
                      : "bg-white/10 text-white/40 border border-white/10"
                  }`}>
                    {isPast ? "✓" : num}
                  </span>
                  <span className={`text-sm font-medium xsm:hidden sm:inline transition-colors duration-200 ${
                    isActive ? "text-white" : isPast ? "text-blue-primary/60" : locked ? "text-white/20" : "text-white/35"
                  }`}>
                    {label}
                  </span>
                </button>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="w-8 h-px mx-1 rounded-full transition-colors duration-300 xsm:hidden sm:block flex-shrink-0"
                    style={{ background: isPast ? "#108198" : "rgba(255,255,255,0.08)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex justify-center lg:pr-[192px]">
        {newKnifeStep === "1" ? (
          <NewCollectionKnifeForm
            setNewKnifeObjOnSubmit={setNewKnifeObjOnSubmit}
            setStepManually={setStepManually}
            collectionKnifeObj={newKnifeObj}
            setFormNotReadyOnChange={setFormNotReadyOnChange}
          />
        ) : newKnifeStep === "2" ? (
          <GalleryInput
            updateGalleryFiles={updateGalleryFiles}
            galleryFiles={galleryFiles}
            setStepManually={setStepManually}
          />
        ) : newKnifeStep === "3" ? (
          <NewCollectionKnifeSummary
            galleryFiles={galleryFiles}
            newKnifeObj={newKnifeObj}
            setStepManually={setStepManually}
          />
        ) : newKnifeStep === "4" ? (
          <NewCollectionKnifeSubmit
            galleryFiles={galleryFiles}
            newKnifeObj={newKnifeObj}
            setStepManually={setStepManually}
          />
        ) : null}
      </div>

    </section>
  );
};

export default AddNewKnifeToCollectionPage;
