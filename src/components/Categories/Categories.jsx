import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Category from "./Category/Category";
import useStyles from "./styles";

const Categories = () => {
  const { subCategories } = useSelector((state) => state.products);
  const classes = useStyles();
  return (
    <>
      {subCategories && subCategories.length > 0 && (
        <main className={classes.content}>
          <Typography align="center" variant="h4">
            Recommended Categories
          </Typography>
          <div className={classes.toolbar} />
          <Grid container justifyContent="center" spacing={4}>
            {subCategories?.map((category, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Category category={category} />
              </Grid>
            ))}
          </Grid>
        </main>
      )}
    </>
  );
};

export default Categories;
