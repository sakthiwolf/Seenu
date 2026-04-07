import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SliderArrowProps = {
  onClick?: () => void;
};

const PrevArrow = ({ onClick }: SliderArrowProps) => (
  <IconButton
    onClick={onClick}
    className="!absolute !left-1 md:!left-2 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md hover:!bg-gray-100"
    aria-label="Previous featured"
  >
    <ArrowBackIosNewIcon fontSize="small" />
  </IconButton>
);

const NextArrow = ({ onClick }: SliderArrowProps) => (
  <IconButton
    onClick={onClick}
    className="!absolute !right-1 md:!right-2 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md hover:!bg-gray-100"
    aria-label="Next featured"
  >
    <ArrowForwardIosIcon fontSize="small" />
  </IconButton>
);

const productSlides = [
  { categoryId: "tiles_designer_tiles", name: "Designer Tiles", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "tiles_kitchen_tiles", name: "Kitchen Tiles", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "faucets_wall_mounted_faucets", name: "Wall Mounted Faucets", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "faucets_sensor_faucets", name: "Sensor Faucets", image: "https://images.unsplash.com/photo-1600566753052-1f72f5f9f3db?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "showers_shower_panels", name: "Shower Panels", image: "https://images.unsplash.com/photo-1564540579594-0220fd1520a6?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "sinks_wash_basins", name: "Wash Basins", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "health_faucets_jet_spray_hose", name: "Jet Spray with Hose", image: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1200&q=80" },
  { categoryId: "accessories_bathroom_shelves", name: "Bathroom Shelves", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80" },
];

export default function NewShowcaseSlider() {
  const navigate = useNavigate();
  const slides = productSlides;
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const settings = {
    dots: true,
    arrows: true,
    infinite: slides.length > 5,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 650,
    cssEase: "ease-in-out",
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="px-3 md:px-6 lg:px-20 py-8">
      <div className="relative px-7 md:px-10">
        <Slider {...settings}>
          {slides.map((item) => (
            <div key={item.categoryId} className="px-2 py-2">
              <div
                onClick={() => item.categoryId && navigate(`/products/${item.categoryId}`)}
                className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="overflow-hidden bg-gray-200">
                  <img
                    src={failedImages.has(item.categoryId) ? "/seller_banner_image.jpg" : item.image}
                    alt={item.name || "Featured"}
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => {
                      setFailedImages(prev => new Set([...prev, item.categoryId]));
                    }}
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-800 truncate">
                    {item.name || item.categoryId.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-[#00927c]">Explore now</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
