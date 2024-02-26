import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  Cart,
  ClientLayout,
  Login,
  Navbar,
  NodesTable,
  Orders,
  ProductDetails,
  Toast,
} from "./components";
import Alert from "./components/Alert/Alert";
import Loader from "./components/Loader/Loader";
import adminRoutes from "./components/Routes/adminRoutes";
import ProfileSideBar from "./components/SideBar/ProfileSideBar/ProfileSideBar";
import { ROLES } from "./constants/constant";
import {
  getCategories,
  getNodes,
  getUserById,
  logoutUser,
} from "./state/actions";
import useStyles from "./styles";
import "./styles.css";
import { ecommerceLocalStorage, parseJwt } from "./utils";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import BaseCategories from "./components/Categories/BaseCategories/BaseCategories";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = useSelector((state) => state);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserOnReload = () => {
      if (validUser()) {
        const userId = ecommerceLocalStorage.get("userId");
        dispatch(getUserById(userId));
      }
    };

    const userToken = ecommerceLocalStorage.get("token");
    if (userToken) getUserOnReload();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNodes());
    dispatch(getCategories());
  }, []);

  const validUser = () => {
    const userToken = ecommerceLocalStorage.get("token");
    if (userToken) {
      const decodedJwt = parseJwt(userToken) || null;
      if (decodedJwt.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const userToken = ecommerceLocalStorage.get("token");
    if (userToken && !validUser()) {
      dispatch(
        logoutUser("Session Expired. Please Log back in to continue...")
      );
    }
  }, [location, dispatch]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (user && user.role === ROLES.admin) setIsAdmin(true);
  }, [user]);

  return (
    <>
      <div>
        <Navbar totalItems={cart?.total_items} />
        <div className={classes.toolbar} />

        <Routes>
          <Route exact path="/admin" element={<NodesTable />} />
          <Route exact path="/category-list" element={<BaseCategories />} />
          <Route exact path="/categories/:id" element={<ClientLayout />} />
          <Route exact path="/categories" element={<ClientLayout />} />
          <Route exact path="/" element={<Navigate to={"/categories"} />} />
          <Route exact path="/items/:id" element={<ProductDetails />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/contact-us" element={<ContactUs />} />

          {isAdmin &&
            adminRoutes.map((route) => (
              <Route exact path={route.path} element={route.component} />
            ))}
        </Routes>

        <ProfileSideBar />
        <Alert />
      </div>

      {/* General Actions */}
      <Loader />
      <Toast />
    </>
  );
};

export default App;
