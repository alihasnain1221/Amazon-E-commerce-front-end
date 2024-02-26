import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import BaseCategory from "../Category/BaseCategory/BaseCategory";
import useStyles from "./styles";

const BaseCategories = () => {
  const { baseNodes } = useSelector((state) => state.nodes);
  const nodesToShow = baseNodes.filter((node) => node.visible) || [];
  const classes = useStyles();
  return (
    <>
      {nodesToShow && nodesToShow.length > 0 && (
        <main className={classes.content}>
          <Typography align="center" variant="h4">
            Category list
          </Typography>
          <div className={classes.toolbar} />
          <Grid container justifyContent="center" spacing={4}>
            {nodesToShow?.map((category, index) => (
              <Grid item key={index} xs={12} sm={6} md={3} lg={2}>
                <BaseCategory category={category} />
              </Grid>
            ))}
          </Grid>
        </main>
      )}
    </>
  );
};

export default BaseCategories;
