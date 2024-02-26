import { Card, TableCell, TableContainer, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ORDERS_COLLAPSE_TABLE_HEADERS,
  ORDERS_TABLE_HEADERS,
} from "../../constants/personalizationConstant";
import { navigateToProductDetailsPage, tdOrderStatusFormat } from "../../utils";
import MainTable from "../MainTable/MainTable";
import useStyles from "./styles";

const Orders = () => {
  const { userOrders: orders } = useSelector((state) => state.orders);
  const classes = useStyles();

  const EmptyList = () => (
    <Typography variant="subtitle1">
      You have no orders in your order list.
      <Link to="/" className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );

  const OrderList = () => {
    return (
      <>
        <div className={classes.NTTableHeaderInfo}>
          <div>
            <Typography variant="p" component="p">
              Total Available Orders: {orders.length}
            </Typography>
          </div>
        </div>
        <MainTable
          columns={ORDERS_TABLE_HEADERS}
          rows={orders}
          showSrNumColumn
          collapsable
          collapsableDisable={(row, index) => row.products.length === 0}
          handleExpandedTab={(row, index) => (
            <CollapsableTab row={row} index={index} />
          )}
          customCellRenderer={(column, row, index) =>
            renderTd(column, row, index)
          }
        />
      </>
    );
  };

  const CollapsableTab = ({ row, index }) => {
    return (
      <>
        <Typography variant="h6" gutterBottom component="div">
          Products
        </Typography>
        <MainTable
          columns={ORDERS_COLLAPSE_TABLE_HEADERS}
          rows={row.products}
          showSrNumColumn
          customCellRenderer={(column, row, index) =>
            renderTd(column, row, index)
          }
        />
      </>
    );
  };

  const renderTd = (column, row, index) => {
    switch (column.itemKey) {
      case "status":
        return (
          <TableCell key={index} align={column.align}>
            {tdOrderStatusFormat(row[column.itemKey])}
          </TableCell>
        );

      case "ttlProducts":
        return (
          <TableCell key={index} align={column.align}>
            {row?.products ? row.products.length : 0}
          </TableCell>
        );

      case "ttlQuantity":
        let totalProducts = 0;
        row.products.forEach(
          (orderedProduct) => (totalProducts += orderedProduct.quantity)
        );
        return (
          <TableCell key={index} align={column.align}>
            {totalProducts}
          </TableCell>
        );

      case "productImg":
        return (
          <TableCell
            className="ellipsis cursor-pointer productImg"
            onClick={() => navigateToProductDetailsPage(row.asin)}
          >
            <div className={classes.productImage}>
              <img src={row.imageUrl} className="imgTag" alt="productImage" />
            </div>
          </TableCell>
        );

      default:
        return (
          <TableCell key={index} align={column.align}>
            {renderTd(column, row)}
          </TableCell>
        );
    }
  };

  return (
    <>
      <Card className={classes.NTCard}>
        <TableContainer component={Paper} className={classes.NTTable}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.NTTableHeader}
          >
            Orders
          </Typography>
          {orders.length ? <OrderList /> : <EmptyList />}
        </TableContainer>
      </Card>
    </>
  );
};

export default Orders;
