import { IconButton } from "@mui/material";
import React from "react";

const HeaderButton = (props) => {
  const { imgSrc, label, handleClick } = props;
  return (
    <>
      <div className="header-btn-wrapper" onClick={() => handleClick()}>
        <IconButton>
          <img src={imgSrc} alt={label} className="header-btn" />
        </IconButton>
        <span>{label}</span>
      </div>
    </>
  );
};

export default HeaderButton;
