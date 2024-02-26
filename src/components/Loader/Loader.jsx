import React from "react";
import { useSelector } from "react-redux";
import logoIcon from "../../assets/commerce.png";
import useStyles from "./styles";

const Loader = () => {
  const { loading } = useSelector((state) => state.general);
  const classes = useStyles();

  return (
    <>
      {loading && (
        <div className={classes.loaderWrapper}>
          <div className={classes.loader}>
            <img
              src={logoIcon}
              alt="Logo"
              className={`logo-animation ${classes.logo}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
