import { Grid } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

export const ProductSlideshow = ({ images, seconds, height, width }) => {
  return (
    <div style={{maxWidth:width}}> 
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}

        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"

      >
        {" "}
        {images &&
          images.map((image) => {
            return (
              <SwiperSlide>
                <Image width={width} height={height} src={image} alt={image}  />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
