
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
};

const FinishedProducts = createSlice({
  name: "FinishedProducts",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
    },
    FinishedProductsSuccess(state, action) {
      state.user = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const {
  apiError,
  FinishedProductsSuccess,
} = FinishedProducts.actions

export default FinishedProducts.reducer;
