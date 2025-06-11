import { Box } from "@mui/material";
import Slider from "react-slick";
import ItemSpecial from "./item-special";
import type { Specialty } from "../../apis/use-case/get-all-specialiste";
import { assets } from "../../assets/assets_frontend/assets";
export const specialityData = [
  assets.General_physician,
  assets.Gynecologist,
  assets.Dermatologist,
  assets.Pediatricians,
  assets.Neurologist,
  assets.Gastroenterologist,
];

const SpecialitySlider = ({ data }: { data: Specialty[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Box key={index} sx={{ px: 1 }}>
            <ItemSpecial item={item} image={specialityData[index]} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SpecialitySlider;
