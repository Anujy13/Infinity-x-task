import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from "reselect";
import { fetchVoucherImagesNumData } from '../../slices/thunks';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const VoucherImages = () => {
  const dispatch = useDispatch();

  // Selecting data from Redux state
  const selectLayoutState = (state) => state.VoucherImageNum;
  const userprofileData = createSelector(
    selectLayoutState,
    (state) => state.user2,
    (state) => state.error,
    (state) => state.loading  // Assuming state.user2 is the array of images
  );
  const user2 = useSelector(userprofileData);
  const loading = useSelector(userprofileData);
  const error = useSelector(userprofileData);

  useEffect(() => {
    dispatch(fetchVoucherImagesNumData());
  }, [dispatch]);

  useEffect(() => {
    console.log('user2:', user2); // Log the user2 array
  }, [user2]);

  // Handling loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handling errors (adjust this logic based on your error structure)
  if (error) {
    if (error.status === 500 || error.status === 404) {
      return <p>{error.message}</p>;
    }
    // Handle other types of errors if needed
    return <p>Error occurred: {error.message}</p>;
  }
  // Rendering Swiper component if user2 exists and has elements
  return (
    <>
      {user2 && user2.length > 0 ? (
        <Swiper
          navigation
          pagination={{ clickable: true }}
          loop
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
        <p>No captures in Camera</p>
      )}
    </>
  );
};

export default VoucherImages;
