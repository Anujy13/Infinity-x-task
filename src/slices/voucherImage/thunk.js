import { getVoucherImagesNumData } from "../../helpers/fakebackend_helper";

// action
import { dataSuccess2 } from "./reducer";

export const fetchVoucherImagesNumData = () => async (dispatch) => {
    try {
        
           const response = await getVoucherImagesNumData();
           dispatch(dataSuccess2(response));

    } catch (error) {
        //dispatch(profileError(error));
    }
};