import './App.css';
import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';

import { Route, Routes, useNavigate } from 'react-router-dom';

import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import CustomerRoutes from './routes/CustomerRoutes';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import SellerAccountVerification from './seller/pages/SellerAccountVerification';
import SellerAccountVerified from './seller/pages/SellerAccountVerified';
import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
import { useEffect } from 'react';
import { fetchSellerProfile, resetSellerState } from './Redux Toolkit/Seller/sellerSlice';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import AdminAuth from './admin/pages/Auth/AdminAuth';
import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
import { createHomeCategories } from './Redux Toolkit/Customer/Customer/AsyncThunk';
import { homeCategories } from './data/homeCategories';
import { resetSellerAuthState } from './Redux Toolkit/Seller/sellerAuthenticationSlice';
import { resetUserState } from './Redux Toolkit/Customer/UserSlice';

function App() {
  const dispatch = useAppDispatch()
  const { auth, sellerAuth, sellers, user } = useAppSelector(store => store)
const navigate=useNavigate();
  const isSellerSession =
    localStorage.getItem("authType") === "seller" ||
    Boolean(sellerAuth.jwt) ||
    Boolean(sellers.profile);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    if (!jwt) return;

    const authType = localStorage.getItem("authType");

    if (authType === "seller") {
      dispatch(resetUserState());
      dispatch(fetchSellerProfile(jwt));
      return;
    }

    if (authType === "customer") {
      dispatch(resetSellerAuthState());
      dispatch(resetSellerState());
      dispatch(fetchUserProfile({ jwt, navigate }));
      return;
    }

    // fallback (older sessions)
    dispatch(fetchUserProfile({ jwt, navigate }));
  }, [auth.jwt, sellerAuth.jwt, dispatch, navigate])

  useEffect(() => {
    dispatch(createHomeCategories(homeCategories))
    // dispatch(fetchHomePageData())
  }, [dispatch])

  return (
    <ThemeProvider theme={customeTheme}>
      <div className='App' >


        <Routes>
          {isSellerSession && <Route path='/seller/*' element={<SellerDashboard />} />}
          {user.user?.role === "ROLE_ADMIN" && <Route path='/admin/*' element={<AdminDashboard />} />}
          <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
          <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
          <Route path='/become-seller' element={<BecomeSeller />} />
          <Route path='/admin-login' element={<AdminAuth />} />

          <Route path='*' element={<CustomerRoutes />} />

        </Routes>
        {/* <Footer/> */}
      </div>



    </ThemeProvider>
  );
}

export default App;
