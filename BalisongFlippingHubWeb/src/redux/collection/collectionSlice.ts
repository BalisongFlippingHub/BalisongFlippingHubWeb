import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "../../modals/Collection";

interface CollectionState {
    collection: Collection | null,
    loading: boolean,
    error: boolean
    errorMessage: string
}

const initialState: CollectionState = {
  collection: null,
  loading: false,
  error: false,
  errorMessage: ""
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearCollection: (state) => {
        state = initialState
    },
  },
  extraReducers: (builder) => {
    
  },
});

export const { clearCollection} =
  collectionSlice.actions;

export default collectionSlice.reducer;
