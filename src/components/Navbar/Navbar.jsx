import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
// import { InputBase } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/commerce.png";
import loginIcon from "../../assets/login.png";
import logoutIcon from "../../assets/logout.png";
// import searchIcon from "../../assets/search.png";
import userIcon from "../../assets/user-2.png";
import { ROLES } from "../../constants/constant";
import {
  getCategories,
  getSearchResults,
  logoutUser,
  profileSideBar,
} from "../../state/actions";
import adminRoutes from "../Routes/adminRoutes";
import clientRoutes from "../Routes/clientRoutes";
import useStyles from "./styles";
import SearchBar from "../SearchBar/SearchBar";
import CategoriesMegaMenu from "../Categories/CategoriesMegaMenu/CategoriesMegaMenu";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);
  // const [showCategories, setShowCategories] = useState(false);
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!searchText.trim()) return;
    dispatch(getSearchResults(searchText.trim(), 2));
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar className={classes.toolbar}>
          <div className={classes.navItems}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={`${classes.title} ${classes.navLinks}`}
              color="inherit"
              onClick={() => dispatch(getCategories())}
            >
              <img
                src={logo}
                alt="Commerce.js"
                height="25px"
                className={`nav-logo ${classes.image}`}
              />
              Commerce.js
            </Typography>

            {/* <Typography
              // key={route.title}
              // component={Link}
              // to={route.path}
              variant="body1"
              className={`${classes.navLinks}`}
              color="inherit"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories
            </Typography> */}

            {clientRoutes.map((route) => (
              <Typography
                key={route.title}
                component={Link}
                to={route.path}
                variant="body1"
                className={`${classes.navLinks}`}
                color="inherit"
              >
                {route.title}
              </Typography>
            ))}
            {user?.role === ROLES.admin &&
              adminRoutes.map((route) => (
                <Typography
                  key={route.title}
                  component={Link}
                  to={route.path}
                  variant="body1"
                  className={`${classes.navLinks}`}
                  color="inherit"
                >
                  {route.title}
                </Typography>
              ))}
          </div>
          <div className="d-flex">
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearchClick={handleSearch}
            />
            {!user ? (
              <>
                <div className={classes.button}>
                  <IconButton
                    component={Link}
                    to="/login"
                    aria-label="log in"
                    color="inherit"
                    className={classes}
                  >
                    <img
                      src={loginIcon}
                      className={classes.iconImg}
                      alt="login"
                    />
                  </IconButton>
                </div>
              </>
            ) : (
              <div className={classes.button}>
                <IconButton
                  aria-label="log out"
                  color="inherit"
                  onClick={() => dispatch(logoutUser())}
                >
                  <img
                    src={logoutIcon}
                    className={classes.iconImg}
                    alt="logout"
                  />
                </IconButton>
              </div>
            )}
            {location.pathname !== "/cart" && (
              <div className={classes.button}>
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="show cart"
                  color="inherit"
                >
                  <Badge badgeContent={cart.length} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>
            )}
            {user && (
              <div className={classes.button}>
                <IconButton
                  aria-label="profile"
                  color="inherit"
                  onClick={() => dispatch(profileSideBar(user))}
                >
                  <img
                    src={userIcon}
                    className={classes.iconImg}
                    alt="profile"
                  />
                </IconButton>
              </div>
            )}
          </div>
        </Toolbar>
        {/* {showCategories && <CategoriesMegaMenu />} */}
      </AppBar>
    </>
  );
};

export default Navbar;
