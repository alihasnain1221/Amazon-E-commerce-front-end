import React from "react";
import useStyles from "./styles";
import menuIcon from "../../assets/menu.png";
import categoryIcon from "../../assets/category.png";
import boxIcon from "../../assets/box.png";
import { SIDEBAR_MENU_ITEMS } from "../../constants/constant";

const SideBar = (props) => {
  const { handleClick, items = [] } = props;
  const classes = useStyles();
  return (
    <div className={classes.sideBar}>
      {items.includes(SIDEBAR_MENU_ITEMS.categories) && (
        <div
          className={classes.sideBarIconWrapper}
          onClick={() => handleClick(SIDEBAR_MENU_ITEMS.categories)}
        >
          <img alt="Catgories" src={menuIcon} className={classes.sideBarIcon} />
        </div>
      )}

      {items.includes(SIDEBAR_MENU_ITEMS.subCategories) && (
        <div
          className={classes.sideBarIconWrapper}
          onClick={() => handleClick(SIDEBAR_MENU_ITEMS.subCategories)}
        >
          <img
            alt="SubCatgories"
            src={categoryIcon}
            className={classes.sideBarIcon}
          />
        </div>
      )}
      {items.includes(SIDEBAR_MENU_ITEMS.products) && (
        <div
          className={classes.sideBarIconWrapper}
          onClick={() => handleClick(SIDEBAR_MENU_ITEMS.products)}
        >
          <img alt="Products" src={boxIcon} className={classes.sideBarIcon} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
