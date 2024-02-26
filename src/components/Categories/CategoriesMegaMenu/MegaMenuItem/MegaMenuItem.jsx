// MegaMenuItem.js
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const MegaMenuItem = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem button key={index}>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default MegaMenuItem;
