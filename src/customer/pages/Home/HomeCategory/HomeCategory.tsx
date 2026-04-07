
import HomeCategoryCard from "./HomeCategoryCard";
import { mainCategory } from "../../../../data/category/mainCategory";

const HomeCategory = () => {
  // Map main categories to real product listing pages (level-2 IDs)
  // so clicking a card always shows products.
  const categoryLinkMap: Record<string, string> = {
    tiles: "tiles_floor_tiles",
    faucets: "faucets_basin_faucets",
    showers: "showers_overhead_showers",
    sinks_basins: "sinks_wash_basins",
    health_faucets: "health_faucets_jet_spray_hose",
    accessories: "accessories_pipe_fittings",
  };

  const categoryImageMap: Record<string, string> = {
    tiles: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
    faucets: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=500&q=80",
    showers: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80",
    sinks_basins: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=500&q=80",
    health_faucets: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80",
    accessories: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",
  };

  const productCategories = mainCategory
    .map((cat) => ({
      name: cat.name,
      categoryId: categoryLinkMap[cat.categoryId] || cat.categoryId,
      image: categoryImageMap[cat.categoryId] || "/seller_banner_image.jpg",
    }))
    .filter((x) => x.categoryId);

  return (
    <div className='flex justify-center gap-7 flex-wrap '>
        {productCategories.map((item) => (
          <HomeCategoryCard key={item.categoryId} item={item} />
        ))}
        
    </div>
  )
}

export default HomeCategory