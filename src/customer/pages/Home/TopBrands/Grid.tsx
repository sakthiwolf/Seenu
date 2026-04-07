const TopBrand = () => {
  const productGrid = [
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1564540579594-0220fd1520a6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  ];
  const fallbackImage = "/seller_banner_image.jpg";

  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12 text-white rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={productGrid[0]}
          alt=""
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage)}
        />
      </div>

      <div className="col-span-2 row-span-6 text-white rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={productGrid[1]}
          alt=""
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage)}
        />
      </div>

      <div className="col-span-4 row-span-6 text-white rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={productGrid[2]}
          alt=""
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage)}
        />
      </div>

      <div className="col-span-3 row-span-12 text-white rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={productGrid[3]}
          alt=""
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage)}
        />
      </div>

      <div className="col-span-4 row-span-6 text-white rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={productGrid[4]}
          alt=""
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage)}
        />
      </div>
      <div className="col-span-2 row-span-6 text-white rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={productGrid[5]}
          alt=""
          onError={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage)}
        />
      </div>

      {/* https://tristenwallace.com/wp-content/uploads/2022/06/wed-7.jpg */}
    </div>
  );
};

export default TopBrand;
