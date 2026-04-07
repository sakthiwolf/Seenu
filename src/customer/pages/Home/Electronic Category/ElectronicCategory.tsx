import ElectronicCategoryCard from "./ElectronicCategoryCard";
import { useMediaQuery } from "@mui/material";
const productHighlights = [
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1600566753052-1f72f5f9f3db?auto=format&fit=crop&w=800&q=80",
    categoryId: "tiles_floor_tiles",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Basin Faucets",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    categoryId: "faucets_basin_faucets",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Rain Showers",
    image:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80",
    categoryId: "showers_overhead_showers",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Wash Basins",
    image:
      "https://images.unsplash.com/photo-1564540579594-0220fd1520a6?auto=format&fit=crop&w=800&q=80",
    categoryId: "sinks_wash_basins",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Health Faucets",
    image:
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=800&q=80",
    categoryId: "health_faucets_jet_spray_hose",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Pipe Fittings",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    categoryId: "accessories_pipe_fittings",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Designer Tiles",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    categoryId: "tiles_designer_tiles",
  },
];

const ElectronicCategory = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {productHighlights
        .slice(0, isSmallScreen ? 5 : productHighlights.length)
        .map((item) => (
          <ElectronicCategoryCard key={item.categoryId} item={item} />
        ))}
    </div>
  );
};

export default ElectronicCategory;
