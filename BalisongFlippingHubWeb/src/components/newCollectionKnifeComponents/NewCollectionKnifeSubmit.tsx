import { useEffect, useState } from "react";
import { axiosApiInstanceAuth } from "../../api/axios";
import { CollectionKnifeDTO } from "../../modals/CollectionKnife";
import { useAppSelector } from "../../redux/hooks";

interface params {
  galleryFiles: Array<File> | null;
  newKnifeObj: CollectionKnifeDTO | null;
  setStepManually: Function;
}

const NewCollectionKnifeSubmit = ({
  galleryFiles,
  newKnifeObj,
  setStepManually,
}: params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState("");
  const [isError, setIsError] = useState(false);
  const [erorMsg, setErrorMsg] = useState("");

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.accessToken);

  const validateNewKnifeObj = () => {
    return true;
  };

  const uploadNewKnife = async () => {
    const formData = new FormData();

    // instantiate all form data values
    formData.append("collectionID", user?.collectionId!);
    formData.append("displayName", newKnifeObj?.displayName!);
    formData.append("knifeMaker", newKnifeObj?.knifeMaker!);
    formData.append("baseKnifeModel", newKnifeObj?.baseKnifeModel!);
    formData.append("knifeType", newKnifeObj?.knifeType!);
    formData.append("aqquiredDate", newKnifeObj?.aqquiredDate!);
    formData.append(
      "isFavoriteKnife",
      JSON.stringify(newKnifeObj?.isFavoriteKnife)!
    );
    formData.append(
      "isFavoriteFlipper",
      JSON.stringify(newKnifeObj?.isFavoriteFlipper)!
    );

    formData.append("coverPhoto", newKnifeObj?.coverPhoto!);

    formData.append("knifeMSRP", newKnifeObj?.msrp!);
    formData.append("overallLength", newKnifeObj?.overallLength!);
    formData.append("weight", newKnifeObj?.weight!);
    formData.append("pivotSystem", newKnifeObj?.pivotSystem!);
    formData.append("latchType", newKnifeObj?.latchType!);
    formData.append("pinSystem", newKnifeObj?.pinSystem!);

    formData.append(
      "hasModularBalance",
      JSON.stringify(newKnifeObj?.hasModularBalance)!
    );
    formData.append("balanceValue", JSON.stringify(newKnifeObj?.balanceValue)!);

    formData.append("bladeStyle", newKnifeObj?.bladeStyle!);
    formData.append("bladeFinish", newKnifeObj?.bladeFinish!);
    formData.append("bladeMaterial", newKnifeObj?.bladeMaterial!);

    formData.append("handleConstruction", newKnifeObj?.handleConstruction!);
    formData.append("handleMaterial", newKnifeObj?.handleMaterial!);
    formData.append("handleFinish", newKnifeObj?.handleFinish!);

    formData.append("averageScore", JSON.stringify(newKnifeObj?.averageScore)!);
    formData.append("feelScore", JSON.stringify(newKnifeObj?.feelScore)!);
    formData.append(
      "flippingScore",
      JSON.stringify(newKnifeObj?.flippingScore)!
    );
    formData.append("qualityScore", JSON.stringify(newKnifeObj?.qualityScore)!);
    formData.append("soundScore", JSON.stringify(newKnifeObj?.soundScore)!);
    formData.append(
      "durabilityScore",
      JSON.stringify(newKnifeObj?.durabilityScore)!
    );

    // gallery images set to form
    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach((file, _i) => {
        formData.append("galleryFiles", file);
      });
    } else {
      formData.append("galleryFiles", "");
    }

    // post to api
    setIsLoading(true);
    await axiosApiInstanceAuth
      .request({
        url: "/collection/me/add-knife",
        method: "post",
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("adding new knife responese", res);
      })
      .catch((err) => {
        console.log("adding new knife error", err);
        setIsError(true);
        setErrorMsg(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // validate new knfie obj for backend
    if (!newKnifeObj || newKnifeObj === null || !validateNewKnifeObj()) {
      setIsError(true);
      setErrorMsg("Form Data Error");
    }

    // initate uploading of new knife obj
    if (!isError) {
      uploadNewKnife();
    }
  }, []);

  return (
    <section className="w-full pt-[60px] lg:pl-[192px] md:pl-0 h-screen flex justify-center items-center">
      <div className="w-2/5 bg-shadow p-4 rounded">
        {isError ? (
          <div>
            <h5>Error</h5>
          </div>
        ) : isLoading ? (
          <div>
            <h5>Loading...</h5>
          </div>
        ) : (
          <div>
            <h5>Success</h5>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewCollectionKnifeSubmit;
