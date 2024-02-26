import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { SIDEBAR_MENU_ITEMS } from "../../constants/constant";
import { getCategories } from "../../state/actions";
import BaseCategories from "../Categories/BaseCategories/BaseCategories";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import SideBar from "../SideBar/SideBar";
import useStyles from "./styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import banner_1 from "../../assets/hp_banner_1.png";
import banner_2 from "../../assets/hp_banner_2.png";
import banner_3 from "../../assets/hp_banner_3.png";

const ClientLayout = () => {
  const { subCategories, products } = useSelector((state) => state.products);
  // const { baseNodes } = useSelector((state) => state.nodes);
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  // const baseCategoriesRef = useRef(null);
  const subCategoriesRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (subCategories.length === 0 || products.length === 0) {
      if (location.pathname !== "/categories") {
        dispatch(getCategories(params.id));
      } else {
        dispatch(getCategories());
      }
    }
  }, [params.id, dispatch, location.pathname]);

  const handleSidebarItemClick = (item) => {
    switch (item) {
      // case SIDEBAR_MENU_ITEMS.categories:
      //   return baseCategoriesRef.current.scrollIntoView({
      //     behavior: "smooth",
      //   });
      case SIDEBAR_MENU_ITEMS.subCategories:
        return subCategoriesRef.current.scrollIntoView({
          behavior: "smooth",
        });
      case SIDEBAR_MENU_ITEMS.products:
        return productsRef.current.scrollIntoView({
          behavior: "smooth",
        });

      default:
        return;
    }
  };

  const sideBarItems = [];
  // if (baseNodes && baseNodes.length > 0)
  //   sideBarItems.push(SIDEBAR_MENU_ITEMS.categories);
  if (subCategories && subCategories.length > 0)
    sideBarItems.push(SIDEBAR_MENU_ITEMS.subCategories);
  if (products && products.length > 0)
    sideBarItems.push(SIDEBAR_MENU_ITEMS.products);

  return (
    <>
      <div className={classes.bodyWrapper}>
        {/* <SideBar items={sideBarItems} handleClick={handleSidebarItemClick} /> */}
        {/* <div> */}
        <AliceCarousel
          autoPlay
          infinite
          disableButtonsControls // Hide default button controls
          autoPlayInterval={5000} // Set the interval for autoplay in milliseconds
          animationType="fadeout"
        >
          <img src={banner_1} alt="Banner 1" className={classes.bannerImage} />
          <img src={banner_2} alt="Banner 2" className={classes.bannerImage} />
          <img src={banner_3} alt="Banner 3" className={classes.bannerImage} />
        </AliceCarousel>
        {/* <div ref={baseCategoriesRef}>
            <BaseCategories />
          </div> */}
        <div ref={subCategoriesRef}>
          <Categories />
        </div>
        <div ref={productsRef}>
          <Products />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ClientLayout;
