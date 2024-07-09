import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from "reselect";
import { fetchVoucherImagesNumData } from '../../slices/thunks';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const VoucherImages = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.VoucherImageNum;

  const userprofileData = createSelector(
    selectLayoutState,
    (state) => state.user2 // Assuming state.user2 is the array of images
  );

  const user2 = useSelector(userprofileData);

  useEffect(() => {
    dispatch(fetchVoucherImagesNumData());
  }, [dispatch]);

  useEffect(() => {
    console.log('user2:', user2); // Log the user2 array
  }, [user2]);

  return (
    <React.Fragment>
      {user2 && user2.length > 0 ? ( // Ensure user2 exists and has elements
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="mySwiper swiper navigation-swiper rounded"
        >
          {user2.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`data:image/png;base64,${image.imageBase64}`}
                alt={image.imageName}
                className="img-fluid"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading...</p> // Show a loading message if user2 is undefined or empty
      )}
    </React.Fragment>
  );
};

export default VoucherImages;
