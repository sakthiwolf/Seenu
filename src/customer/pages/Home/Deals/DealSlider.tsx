import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type SliderArrowProps = {
  onClick?: () => void;
};

const PrevArrow = ({ onClick }: SliderArrowProps) => (
  <IconButton
    onClick={onClick}
    className="!absolute !left-0 md:!left-2 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md hover:!bg-gray-100"
    aria-label="Previous deals"
  >
    <ArrowBackIosNewIcon fontSize="small" />
  </IconButton>
);

const NextArrow = ({ onClick }: SliderArrowProps) => (
  <IconButton
    onClick={onClick}
    className="!absolute !right-0 md:!right-2 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md hover:!bg-gray-100"
    aria-label="Next deals"
  >
    <ArrowForwardIosIcon fontSize="small" />
  </IconButton>
);

export default function DealSlider() {
  const productDeals = [
    {
      category: {
        categoryId: "tiles_floor_tiles",
        image: "https://images.unsplash.com/photo-1564540579594-0220fd1520a6?auto=format&fit=crop&w=900&q=80",
      },
      discount: 25,
    },
    {
      category: {
        categoryId: "faucets_sensor_faucets",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
      },
      discount: 30,
    },
    {
      category: {
        categoryId: "showers_overhead_showers",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80",
      },
      discount: 20,
    },
    {
      category: {
        categoryId: "sinks_kitchen_sinks",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
      },
      discount: 18,
    },
    {
      category: {
        categoryId: "health_faucets_jet_spray_hose",
        image: "https://images.unsplash.com/photo-1600566753052-1f72f5f9f3db?auto=format&fit=crop&w=900&q=80",
      },
      discount: 15,
    },
    {
      category: {
        categoryId: "accessories_pipe_fittings",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80",
      },
      discount: 22,
    },
  ];

  const placeholderDeals = Array.from({ length: 5 }, (_, index) => ({
    category: {
      categoryId: `featured_${index + 1}`,
      image: "/seller_banner_image.jpg",
    },
    discount: 20 + index * 5,
  }));
  const sliderDeals = productDeals.length > 0 ? productDeals : placeholderDeals;
  const desktopSlides = 5;

  const settings = {
    dots: true,
    arrows: true,
    infinite: sliderDeals.length > desktopSlides,
    slidesToShow: desktopSlides,
    slidesToScroll: 1,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-5 lg:px-20">
      <div className="relative px-8 md:px-10">
        <Slider {...settings}>
          {sliderDeals.map((item) => (
            <div className="px-2">
              <DealCard deal={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
