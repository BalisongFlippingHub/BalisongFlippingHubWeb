import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "../../modals/Collection";
import { CollectionKnife } from "../../modals/CollectionKnife";

interface CollectionState {
  collection: Collection | null;
  collectionKnives: Array<CollectionKnife>;
}

const initialState: CollectionState = {
  collection: null,
  collectionKnives: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearCollection: (state) => {
      state.collection = null;
      state.collectionKnives = [];
    },
    setCollection: (state, action: PayloadAction<Collection>) => {
      state.collection = action.payload;
      state.collectionKnives = action.payload.collectedKnives!;
    },
  },
  extraReducers: (_builder) => {},
});

export const { clearCollection, setCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
