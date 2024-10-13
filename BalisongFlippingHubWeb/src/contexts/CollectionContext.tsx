// import { createContext, useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Collection } from "../modals/Collection";
// import useAuth from "../hooks/useAuth";

// export type CollectionContextType = {
//   collectionData: Collection | null;
//   getCollectionDataFromBackend: (collectionID: string) => void;
//   clearCollectionData: () => void;
// };

// export const CollectionContext = createContext<CollectionContextType>(
//   {} as CollectionContextType
// );

// export const CollectionContextProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const [collectionData, setCollectionData] = useState<Collection | null>(null);

//   const [isReady, setIsReady] = useState(false);

//   const getCollectionDataFromBackend = async (collectionID: string) => {
//     console.log("getting collection data with id: ", collectionID);
//     setIsReady(false);
//     await axios
//       .request({
//         url: `/collection/any/${collectionID}`,
//         method: "get",
//       })
//       .then((res) => {
//         console.log("collection fetch response", res);
//         setCollectionData(res.data);
//       })
//       .catch((err) => {
//         console.log("collection fetch err", err);
//       })
//       .finally(() => {
//         setIsReady(true);
//       });
//   };

//   const clearCollectionData = () => {
//     setCollectionData(null);
//   };

//   useEffect(() => {
//     setIsReady(true);
//   }, []);

//   return (
//     <CollectionContext.Provider
//       value={{
//         collectionData,
//         getCollectionDataFromBackend,
//         clearCollectionData,
//       }}
//     >
//       {isReady ? children : null}
//     </CollectionContext.Provider>
//   );
// };
