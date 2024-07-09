import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const licenseSlice = createSlice({
  name: "license",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    licenseSuccess(state, action) {
      state.user = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    licenseLogoutUserSuccess(state, action) {
      state.isUserLogout = true
    },
    reset_license_flag(state) {
      state.error = null
      state.loading = false;
      state.errorMsg = false;
    }
  },
});

export const {
  apiError,
  licenseSuccess,
  licenseLogoutUserSuccess,
  reset_license_flag
} = licenseSlice.actions

export default licenseSlice.reducer;