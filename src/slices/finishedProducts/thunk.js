import { getFirebaseBackend } from "../../helpers/firebase_helper";
import { getFinishedProductsData } from "../../helpers/fakebackend_helper";
import { FinishedProductsSuccess, apiError } from './reducer';

export const fetchFinishedProductsData = () => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      response = await fireBaseBackend.licenseUser(user.email, user.password);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      // Assuming postJwtLogin is imported and implemented correctly
      response = await postJwtLogin({
        email: user.email,
        password: user.password
      });
    } else if (process.env.REACT_APP_API_URL) {
      response = await getFinishedProductsData({
        FromDate: "2024-04-01",
        ToDate: "2025-04-01",
        VoucherTypeID: "6B073462-B205-498D-9BF6-532FE22DA45F"
      });
    }

    if (response) {
      dispatch(FinishedProductsSuccess(response)); // Assuming response.data is the array of items
    } else {
      dispatch(apiError({ message: "No data received from API" }));
    }
  } catch (error) {
    dispatch(apiError({ message: error.message }));
  }
};
