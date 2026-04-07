import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { brands } from "../../../data/Filter/brand";
import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const FilterSection = () => {
  const [expendBrand, setExpendBrand] = useState(false);
  const [expendColor, setExpendColor] = useState(false);
  const handleExpendBrand = () => {
    setExpendBrand(!expendBrand);
  };


  const [searchParams, setSearchParams] = useSearchParams();
  const brandFilter = searchParams.get("brand") || "";
  const colorFilter = searchParams.get("color") || "";
  const priceFilter = searchParams.get("price") || "";
  const discountFilter = searchParams.get("discount") || "";

  const handleExpendColor = () => {
    setExpendColor(!expendColor);
  };

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
        onClick={clearAllFilters}
          size="small"
          className="text-teal-600 cursor-pointer font-semibold"
        >
          clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="brand"
            >
              Brand
            </FormLabel>
            <RadioGroup
              value={brandFilter}
              onChange={updateFilterParams}
              aria-labelledby="brand"
              name="brand"
            >
              {brands
                .slice(0, expendBrand ? brands.length : 5)
                .map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.value}
                    control={<Radio size="small" />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleExpendBrand}
              className="text-teal-600 cursor-pointer hover:text-teal-900 flex items-center"
            >
              {expendBrand ? "hide" : `+ ${brands.length - 5} more`}
            </button>
          </div>
        </section>
        <Divider />
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup
              value={colorFilter}
              onChange={updateFilterParams}
              aria-labelledby="color"
              name="color"
            >
              {colors
                .slice(0, expendColor ? colors.length : 5)
                .map((item) => (
                  <FormControlLabel
                    sx={{ fontSize: "12px" }}
                    key={item.name}
                    value={item.name}
                    control={<Radio size="small" />}
                    label={
                      <div className="flex items-center gap-3">
                        <p>{item.name}</p>
                        <span
                          style={{ backgroundColor: item.hex }}
                          className={` h-5 w-5 rounded-full ${
                            item.name === "White" ? "border" : "border"
                          }`}
                        ></span>
                      </div>
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleExpendColor}
              className="text-teal-600 cursor-pointer hover:text-teal-900 flex items-center"
            >
              {expendColor ? "hide" : `+ ${colors.length - 5} more`}
            </button>
          </div>
        </section>
        <Divider />

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              name="price"
              value={priceFilter}
              onChange={updateFilterParams}
              aria-labelledby="price"
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="brand"
            >
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              value={discountFilter}
              onChange={updateFilterParams}
              aria-labelledby="brand"
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
