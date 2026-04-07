import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";
import { resetSellerAuthState } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";

import { FavoriteBorder } from "@mui/icons-material";


const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("tiles");
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, auth, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const openMegaMenu = (categoryId: string) => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
    }
    setSelectedCategory(categoryId);
    setShowSheet(true);
  };

  const scheduleCloseMegaMenu = () => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
    }
    closeMenuTimer.current = setTimeout(() => {
      setShowSheet(false);
    }, 300);
  };



  const becomeSellerClick = () => {
    if (sellers.profile?._id) {
      navigate("/seller")
    } else {
      // If a customer is logged-in, clear customer/seller JWT before starting seller signup/login.
      if (user.user) {
        dispatch(performLogout());
        dispatch(resetSellerAuthState());
      }
      navigate("/become-seller?mode=login")
    }
  }

 

  return (
    <Box
      sx={{ zIndex: 1200 }}
      className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80 "
    >
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={() => toggleDrawer(true)()}>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className="logo cursor-pointer text-lg md:text-2xl  text-[#00927c]"
            >
              EndlessCart
            </h1>
          </div>

          {isLarge && (
            <ul
              onMouseLeave={scheduleCloseMegaMenu}
              className="flex it
          ems-center font-medium text-gray-800 "
            >
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => openMegaMenu(item.categoryId)}
                  onClick={() => navigate(`/products/${item.categoryId}`)}
                  className="mainCategory hover:text-[#00927c] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={()=>navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                // src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwc0abe627/homepage/ShopByGender/Woman.jpg"
              />
              <h1 className="font-semibold hidden lg:block">
                {user.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <IconButton onClick={()=>navigate("/wishlist")}>
            <FavoriteBorder sx={{ fontSize: 29 }}
                className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon
                sx={{ fontSize: 29 }}
                className="text-gray-700"
              />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>
      {showSheet && selectedCategory && (
        <div
          onMouseDown={() => {
            if (closeMenuTimer.current) {
              clearTimeout(closeMenuTimer.current);
              closeMenuTimer.current = null;
            }
          }}
          onMouseLeave={scheduleCloseMegaMenu}
          onMouseEnter={() => openMegaMenu(selectedCategory)}
          className="categorySheet absolute top-[70px] left-20 right-20 z-[80] pointer-events-auto"
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
