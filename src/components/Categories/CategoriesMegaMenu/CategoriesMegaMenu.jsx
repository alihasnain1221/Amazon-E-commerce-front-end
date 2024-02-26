// MegaMenu.js
import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import MegaMenuItem from "./MegaMenuItem/MegaMenuItem";
import { useSelector } from "react-redux";

const menuData = [
  {
    title: "Column 1",
    items: ["Link 1", "Link 2", "Link 3"],
  },
  {
    title: "Column 2",
    items: ["Link 4", "Link 5", "Link 6"],
  },
  // Add more columns as needed
];

const CategoriesMegaMenu = () => {
  const { baseNodes } = useSelector((state) => state.nodes);
  const nodesToShow = baseNodes.filter((node) => node.visible) || [];
  return (
    <Container maxWidth="xl">
      {/* <Grid container spacing={3}> */}
      {/* {nodesToShow.map((category, index) => ( */}
      <Grid item xs={3}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          {/* <Typography variant="h6">{category.title}</Typography> */}
          <MegaMenuItem items={nodesToShow} />
        </Paper>
      </Grid>
      {/* ))} */}
      {/* </Grid> */}
    </Container>
  );
};

export default CategoriesMegaMenu;
