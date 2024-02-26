import {
  Card,
  Checkbox,
  IconButton,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../../../assets/close.png";
import invisibleIcon from "../../../assets/invisible.png";
import refreshIcon from "../../../assets/refresh.png";
import visibleIcon from "../../../assets/view.png";
import { TABLE_QUICK_TOOLS } from "../../../constants/constant";
import {
  NODES_COLLAPSE_TABLE_HEADERS,
  NODES_TABLE_HEADERS,
} from "../../../constants/personalizationConstant";
import {
  getCategoryProducts,
  getNodeSalesEstimation,
  removeProductsFromNode,
  toastMessage,
  updateCategory,
} from "../../../state/actions";
import { navigateToProductDetailsPage } from "../../../utils";
import HeaderButton from "../../GeneralComponents/HeaderButton";
import MainTable from "../../MainTable/MainTable";
import NodesUpdateModal from "../../modals/NodesUpdateModal/NodesUpdateModal";
import useStyles from "./styles";

const NodesTable = () => {
  const { baseNodes: nodesList } = useSelector((state) => state.nodes);
  const [checkboxes, setCheckboxes] = useState([]);
  const [turnVisible, setTurnVisible] = useState(false);
  const [editNode, setEditNode] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const quickTools = [TABLE_QUICK_TOOLS.checkbox, TABLE_QUICK_TOOLS.edit];

  useEffect(() => {
    if (checkboxes.length === 0) return;
    const nodesArr = nodesList.filter((node) => checkboxes.includes(node.id));
    const findIndex = nodesArr.findIndex((node) => !node.visible);
    if (findIndex !== -1) {
      setTurnVisible(true);
    } else {
      setTurnVisible(false);
    }
  }, [checkboxes, nodesList]);

  const handleCheckboxChange = (id) => {
    const newCheckboxesArr = [...checkboxes];
    const alreadyExistIndex = newCheckboxesArr.findIndex(
      (checkedId) => checkedId === id
    );
    if (alreadyExistIndex !== -1) {
      newCheckboxesArr.splice(alreadyExistIndex, 1);
    } else {
      newCheckboxesArr.push(id);
    }
    setCheckboxes(newCheckboxesArr);
  };

  const handleRefreshProducts = async () => {
    if (checkboxes.length === 0)
      return dispatch(toastMessage("Please select atleast one category."));

    const nodesArr = nodesList.filter((node) => checkboxes.includes(node.id));

    for (let i = 0; i < nodesArr.length; i++) {
      const node = nodesArr[i];
      dispatch(getCategoryProducts(node));
    }
    setCheckboxes([]);
  };

  const handleRemoveProducts = async () => {
    if (checkboxes.length === 0)
      return dispatch(toastMessage("Please select atleast one category."));
    const nodesArr = nodesList.filter((node) => checkboxes.includes(node.id));

    for (let i = 0; i < nodesArr.length; i++) {
      const node = nodesArr[i];
      dispatch(removeProductsFromNode(node.id));
    }
    setCheckboxes([]);
  };

  const handleVisibilityToggle = async () => {
    if (checkboxes.length === 0)
      return dispatch(toastMessage("Please select atleast one category."));
    const nodesArr = nodesList.filter((node) => checkboxes.includes(node.id));

    for (let i = 0; i < nodesArr.length; i++) {
      const node = nodesArr[i];
      Object.assign(node, {
        visible: turnVisible,
      });
      dispatch(updateCategory(node));
    }
    setCheckboxes([]);
    setTurnVisible(false);
  };

  const handleCellClick = (e, row, key) => {
    switch (key) {
      case "name":
        if (row.asin) navigateToProductDetailsPage(row.asin);
        break;
      case TABLE_QUICK_TOOLS.edit:
        setEditNode(row);
        break;
      default:
        break;
    }
  };

  const CollapsableTab = ({ row, index }) => {
    return (
      <>
        <Typography variant="h6" gutterBottom component="div">
          Products
        </Typography>
        <MainTable
          columns={NODES_COLLAPSE_TABLE_HEADERS}
          rows={row.products}
          showSrNumColumn
          customCellRenderer={(column, row, index) =>
            renderTd(column, row, index)
          }
          handleCellClick={handleCellClick}
        />
      </>
    );
  };

  const renderTd = (column, row, index) => {
    switch (column.itemKey) {
      case "quantity":
        return (
          <TableCell key={index} align={column.align}>
            {row?.products?.length || 0}
          </TableCell>
        );
      case "weeklySalesEstimation":
        return (
          <TableCell key={index} align={column.align}>
            {row?.estimations.weeklySalesEstimation}
          </TableCell>
        );
      case "monthlySalesEstimation":
        return (
          <TableCell key={index} align={column.align}>
            {row?.estimations.monthlySalesEstimation}
          </TableCell>
        );
      case "visible":
        return (
          <TableCell key={index} align={column.align}>
            {row?.visible ? (
              <Checkbox size="small" color="success" checked={true} readOnly />
            ) : (
              "-"
            )}
          </TableCell>
        );
      case "refereshEstimation":
        const node = nodesList.find((node) => node.id === row.parentNodeId);
        return (
          <TableCell>
            <IconButton
              title="Referesh Est."
              onClick={() => dispatch(getNodeSalesEstimation(row, node))}
            >
              <img
                src={refreshIcon}
                alt={"Referesh Est."}
                className={classes.productEstRefereshIcon}
              />
            </IconButton>
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
            Base Nodes
          </Typography>
          <div className="header-btns-container">
            <HeaderButton
              imgSrc={refreshIcon}
              label={"Refresh Products"}
              handleClick={handleRefreshProducts}
            />
            <HeaderButton
              imgSrc={turnVisible ? visibleIcon : invisibleIcon}
              label={turnVisible ? "Toggle Visible" : "Toggle invisible"}
              handleClick={handleVisibilityToggle}
            />
            <HeaderButton
              imgSrc={closeIcon}
              label={"Remove Products"}
              handleClick={handleRemoveProducts}
            />
          </div>
          <div className={classes.NTTableHeaderInfo}>
            <div>
              <Typography variant="p" component="p">
                Total Available Nodes: {nodesList.length}
              </Typography>
              <Typography variant="p" component="p">
                Selected: {checkboxes.length}
              </Typography>
            </div>
          </div>
          <MainTable
            columns={NODES_TABLE_HEADERS}
            rows={nodesList}
            showSrNumColumn
            quickTools={quickTools}
            collapsable
            collapsableDisable={(row, index) => row.products.length === 0}
            handleExpandedTab={(row, index) => (
              <CollapsableTab row={row} index={index} />
            )}
            customCellRenderer={(column, row, index) =>
              renderTd(column, row, index)
            }
            selectedRows={checkboxes}
            handleRowSelection={(e, checked, row) =>
              handleCheckboxChange(row.id)
            }
            handleCellClick={handleCellClick}
          />
        </TableContainer>
      </Card>
      {editNode && (
        <NodesUpdateModal
          handleClose={() => setEditNode(null)}
          node={editNode}
        />
      )}
    </>
  );
};

export default NodesTable;
