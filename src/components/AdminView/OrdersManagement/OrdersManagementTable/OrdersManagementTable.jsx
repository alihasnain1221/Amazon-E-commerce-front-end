import {
  Avatar,
  Card,
  Checkbox,
  Chip,
  Paper,
  Stack,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cancelIcon from "../../../../assets/cancel.png";
import tickIcon from "../../../../assets/tick.png";
import userIcon from "../../../../assets/user-1.png";
import { ALERT_MODES, ORDER_STATUS } from "../../../../constants/constant";
import {
  MANAGEABLE_ORDERS_COLLAPSE_TABLE_HEADERS,
  MANAGEABLE_ORDERS_TABLE_HEADERS,
} from "../../../../constants/personalizationConstant";
import { alertMessage, profileSideBar } from "../../../../state/actions";
import { updateOrder } from "../../../../state/actions/orders";
import {
  navigateToProductDetailsPage,
  tdOrderStatusFormat,
} from "../../../../utils";
import MainTable from "../../../MainTable/MainTable";
import SingleStatsContainer from "../../../Stats/SingleStatsContainer/SingleStatsContainer";
import useStyles from "./styles";

const OrdersManagementTable = () => {
  const classes = useStyles();
  const { manageableOrders } = useSelector((state) => state.orders);
  const [statsData, setStatsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const formatStats = () => {
      let statsQuantitySum = {};

      Object.values(ORDER_STATUS).forEach((value) =>
        Object.assign(statsQuantitySum, {
          [value]: 0,
        })
      );

      manageableOrders.forEach((order) => statsQuantitySum[order.status]++);

      const data = [];
      Object.keys(statsQuantitySum).map((key) =>
        data.push({
          label: key,
          quantity: statsQuantitySum[key],
        })
      );
      setStatsData(data);
    };

    formatStats();
  }, [manageableOrders]);

  const handleDelieved = (e, checked, order) => {
    dispatch(updateOrder({ ...order, status: ORDER_STATUS.done }));
    dispatch(
      alertMessage(
        "Congratulations! Order has been marked as Delieved.",
        ALERT_MODES.success
      )
    );
  };

  const CollapsableTab = ({ row, index }) => {
    return (
      <>
        <Typography variant="h6" gutterBottom component="div">
          Products
        </Typography>
        <MainTable
          columns={MANAGEABLE_ORDERS_COLLAPSE_TABLE_HEADERS}
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
          <>
            <TableCell key={index} align={column.align}>
              {tdOrderStatusFormat(row[column.itemKey])}
            </TableCell>
          </>
        );

      case "userId":
        return (
          <>
            <TableCell key={index} align={column.align}>
              {/* {row.user.username} */}
              <Stack justifyContent={column.align} direction="row" spacing={1}>
                {/* <Chip
                  avatar={
                    <Avatar>
                      {row.user.username.slice(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  label={row.user.username}
                /> */}
                <Chip
                  className={`ellipsis ${classes.userChip}`}
                  onClick={() => dispatch(profileSideBar(row.user))}
                  avatar={<Avatar alt="User" src={userIcon} />}
                  label={row.user.username}
                  title={row.user.username}
                  variant="outlined"
                />
              </Stack>
            </TableCell>
          </>
        );

      case "actions":
        return (
          <>
            <TableCell className={`ellipsis ${classes.actionTd}`}>
              <div className={classes.actionContainer}>
                {row.status === ORDER_STATUS.pending && (
                  <>
                    <div
                      className={classes.actionBtn}
                      onClick={() =>
                        dispatch(
                          updateOrder({ ...row, status: ORDER_STATUS.approved })
                        )
                      }
                    >
                      <img src={tickIcon} alt="accept" className="imgTag" />
                    </div>
                    <div
                      className={classes.actionBtn}
                      onClick={() =>
                        dispatch(
                          updateOrder({ ...row, status: ORDER_STATUS.rejected })
                        )
                      }
                    >
                      <img src={cancelIcon} alt="reject" className="imgTag" />
                    </div>
                  </>
                )}
              </div>
            </TableCell>
          </>
        );

      case "delivered":
        return (
          <>
            <TableCell className={`ellipsis ${classes.actionTd}`}>
              <div className={classes.actionContainer}>
                <Checkbox
                  size="small"
                  color="success"
                  checked={row.status === ORDER_STATUS.done}
                  disabled={row.status !== ORDER_STATUS.approved}
                  onChange={(e, checked) => handleDelieved(e, checked, row)}
                />
              </div>
            </TableCell>
          </>
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
              <img src={row.imageUrl} alt="product" className="imgTag" />
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
            Manage Orders
          </Typography>
          <div className={classes.statsContainer}>
            {statsData.map((stat) => (
              <SingleStatsContainer
                label={stat.label}
                quantity={stat.quantity}
                // amount="100"
              />
            ))}
          </div>
          <div className={classes.NTTableHeaderInfo}>
            <div>
              <Typography variant="p" component="p">
                Total Available Orders: {manageableOrders?.length || 0}
              </Typography>
            </div>
          </div>
          <MainTable
            columns={MANAGEABLE_ORDERS_TABLE_HEADERS}
            rows={manageableOrders}
            showSrNumColumn
            customCellRenderer={(column, row, index) =>
              renderTd(column, row, index)
            }
            collapsable
            collapsableDisable={(row, index) => row.products.length === 0}
            handleExpandedTab={(row, index) => (
              <CollapsableTab row={row} index={index} />
            )}
          />
        </TableContainer>
      </Card>
    </>
  );
};

export default OrdersManagementTable;
