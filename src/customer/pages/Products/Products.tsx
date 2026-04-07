import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import FilterSection from "./FilterSection";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  type SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../Redux Toolkit/Customer/ProductSlice";
import {
  accessoriesLevelTwo,
  faucetsLevelTwo,
  healthFaucetsLevelTwo,
  showersLevelTwo,
  sinksBasinsLevelTwo,
  tilesLevelTwo,
} from "../../../data/category/level two/buildingLevelTwo";

const Products = () => {
  const [sort, setSort] = React.useState("");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showFilter, setShowFilter] = useState(false);
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const categoryTwo: { [key: string]: any[] } = {
    tiles: tilesLevelTwo,
    faucets: faucetsLevelTwo,
    showers: showersLevelTwo,
    sinks_basins: sinksBasinsLevelTwo,
    health_faucets: healthFaucetsLevelTwo,
    accessories: accessoriesLevelTwo,
  };

  const selectedCategory = categoryId || "";
  const categoryTiles = categoryTwo[selectedCategory];

  const handleSortProduct = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    setPage(1);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const navigate = useNavigate();

  const handlePageChange = (value: any) => {
    setPage(value);
    console.log("page nummmberr ", value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const newFilters = {
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      minPrice:
        typeof minPrice !== "undefined" && minPrice !== ""
          ? Number(minPrice)
          : undefined,
      maxPrice:
        typeof maxPrice !== "undefined" && maxPrice !== ""
          ? Number(maxPrice)
          : undefined,
      pageNumber: page - 1,
      minDiscount:
        searchParams.get("discount") !== null
          ? Number(searchParams.get("discount"))
          : undefined,
    };

    dispatch(getAllProducts({ category: categoryId, sort, ...newFilters }));
  }, [searchParams, categoryId, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [searchParams, categoryId, sort]);

  // console.log(" store ", products)
  return (
    <div className="-z-10 mt-10">
      <div className="">
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {categoryId?.split("_").map((item) => (
            <span>{item}</span>
          ))}
        </h1>
      </div>
      {categoryTiles && categoryTiles.length > 0 && (
        <section className="px-9 pb-10">
          <h2 className="text-xl font-semibold text-gray-700 pb-4">
            Browse {categoryId?.split("_").join(" ")} Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryTiles.map((item: any) => (
              <div
                key={item.categoryId}
                onClick={() => navigate(`/products/${item.categoryId}`)}
                className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:border-primary-color hover:text-primary-color"
              >
                <p className="font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="lg:flex">
        <section className="hidden lg:block  w-[20%] ">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton onClick={handleShowFilter}>
                  <FilterAltIcon />
                </IconButton>
              )}
              {showFilter && !isLarge && (
                <Box sx={{ zIndex: 3 }} className="absolute top-[60px]">
                  <FilterSection />
                </Box>
              )}
            </div>
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="sort">Sort</InputLabel>
              <Select
                labelId="sort"
                id="sort"
                value={sort}
                label="Sort"
                onChange={handleSortProduct}
              >
                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />

          {products.products?.length > 0 ? (
            <section className="grid sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4
            gap-y-5 px-5 justify-center">
              {products.products.map((item: any) => (
                <div key={item._id} className="">
                  <ProductCard item={item} categoryId={categoryId} />
                </div>
              ))}
            </section>
          ) : (
            <section className="items-center flex flex-col gap-5 justify-center h-[67vh] border">
              <img
                className="w-80"
                src="https://cdn.pixabay.com/photo/2022/05/28/10/45/oops-7227010_960_720.png"
                alt=""
              />
              <h1 className="font-bold text-xl text-center flex items-center gap-2">
                Product Not Found For{" "}
                <p className="text-primary-color flex gap-2 uppercase">
                  {" "}
                  {categoryId?.split("_").map((item) => (
                    <span>{item}</span>
                  ))}{" "}
                </p>{" "}
              </h1>
            </section>
          )}
          <div className="flex justify-center pt-10">
            <Pagination
              page={page}
              onChange={(e, value) => handlePageChange(value)}
              color="primary"
              count={products?.totalPages}
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
