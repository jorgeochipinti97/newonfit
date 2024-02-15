import { Grid } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation,Autoplay } from "swiper/modules";

export const ProductSlideshow = ({ images,  width }) => {
  return (
    <div style={{maxWidth:width}}> 
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFlip, Pagination, Navigation,Autoplay]}
        className="mySwiper"

      >
        {" "}
        {images &&
          images.map((image) => {
            return (
              <SwiperSlide key={image}>
                <img style={{maxWidth:'100%',borderRadius:'19px'}} src={image} alt={image}  />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
