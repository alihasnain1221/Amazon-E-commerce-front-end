import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import angleDownIcon from "../../assets/angle-down.png";
import pencilIcon from "../../assets/pencil.png";
import deleteIcon from "../../assets/remove-user.png";
import {
  ALIGN_OPTIONS,
  TABLE_COLUMN_TYPE,
  TABLE_QUICK_TOOLS,
} from "../../constants/constant";
import { dateFormatter } from "../../utils";
import useStyles from "./styles";

const MainTable = (props) => {
  const {
    columns = [],
    rows = [],
    collapsable,
    collapsableDisable,
    showSrNumColumn,
    customCellRenderer,
    handleExpandedTab,
    quickTools = [],
    selectedRows = [],
    handleRowSelection,
    handleCellClick,
  } = props;
  const classes = useStyles();

  const renderTdData = (column, row) => {
    const text = row[column.itemKey];
    switch (column.type) {
      case TABLE_COLUMN_TYPE.longDate:
        return dateFormatter(text);
      case TABLE_COLUMN_TYPE.shortDate:
        return dateFormatter(text, "YYYY-MM-DD");
      case TABLE_COLUMN_TYPE.upperCaseText:
        return (text + "").toUpperCase();
      case TABLE_COLUMN_TYPE.smallCaseText:
        return (text + "").toLowerCase();
      default:
        return text || "-";
    }
  };

  const rederTd = (row, column, i) => {
    switch (column.type) {
      case TABLE_COLUMN_TYPE.phone:
        return (
          <TableCell
            key={i}
            align={column.align}
            title={row[column.itemKey]}
            className={`cursor-pointer ${column.cssClass ?? ""}`}
            onClick={() =>
              row[column.itemKey] &&
              window.open(`tel:+${row[column.itemKey].replace(/\D/g, "")}`)
            }
          >
            {row[column.itemKey]}
          </TableCell>
        );

      case TABLE_COLUMN_TYPE.email:
        return (
          <TableCell
            key={i}
            align={column.align}
            title={row[column.itemKey]}
            className={`cursor-pointer ${column.cssClass ?? ""}`}
            onClick={() =>
              row[column.itemKey] &&
              window.open(`mailto:${row[column.itemKey]}`)
            }
          >
            {row[column.itemKey]}
          </TableCell>
        );
      default:
        return (
          <TableCell
            key={i}
            align={column.align}
            title={renderTdData(column, row)}
            className={column.cssClass ?? ""}
            onClick={(e) =>
              handleCellClick && handleCellClick(e, row, column.itemKey)
            }
          >
            {renderTdData(column, row)}
          </TableCell>
        );
    }
  };

  const Row = ({ row, index }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow key={index} sx={{ "& > *": { borderBottom: "unset" } }}>
          {collapsable && (
            <TableCell>
              <IconButton
                aria-label="Dropdown"
                color="inherit"
                onClick={() => setOpen(!open)}
                disabled={collapsableDisable(row, index)}
              >
                <img
                  src={angleDownIcon}
                  className={`${
                    collapsableDisable(row, index) ? "opacity-5" : ""
                  } ${classes.iconImg}`}
                  alt="collapse icon"
                />
              </IconButton>
            </TableCell>
          )}

          {quickTools.includes(TABLE_QUICK_TOOLS.checkbox) && (
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.id)}
                onChange={(e, checked) => handleRowSelection(e, checked, row)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </TableCell>
          )}

          {showSrNumColumn && <TableCell>{index + 1}</TableCell>}

          {columns.map((column, i) =>
            column?.customCellRender
              ? customCellRenderer(column, row, i)
              : rederTd(row, column, i)
          )}

          {quickTools.includes(TABLE_QUICK_TOOLS.edit) && (
            <TableCell>
              <img
                src={pencilIcon}
                onClick={(e) => handleCellClick(e, row, TABLE_QUICK_TOOLS.edit)}
                className={`${classes.editIconImg}`}
                alt="edit icon"
              />
            </TableCell>
          )}

          {quickTools.includes(TABLE_QUICK_TOOLS.delete) && (
            <TableCell>
              <img
                src={deleteIcon}
                onClick={(e) =>
                  handleCellClick(e, row, TABLE_QUICK_TOOLS.delete)
                }
                className={`${classes.editIconImg}`}
                alt="delete icon"
              />
            </TableCell>
          )}
        </TableRow>
        {open && !collapsableDisable(row, index) && (
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={
                columns.length +
                (showSrNumColumn ? 1 : 0) +
                (collapsable ? 1 : 0) +
                quickTools.length
              }
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>{handleExpandedTab(row, index)}</Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };

  return (
    <>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tableHeaderRow}>
            {collapsable && <TableCell />}
            {quickTools.includes(TABLE_QUICK_TOOLS.checkbox) && <TableCell />}
            {showSrNumColumn && (
              <TableCell className={`ellipsis ${classes.tableTh}`}>
                Sr No.
              </TableCell>
            )}
            {columns.map((column, i) => (
              <TableCell
                key={i}
                className={`ellipsis ${classes.tableTh} ${
                  column.cssClass ?? ""
                }`}
                title={column.title || column.label}
                align={column.align || ALIGN_OPTIONS.inherit}
              >
                {column.label || ""}
              </TableCell>
            ))}
            {quickTools.includes(TABLE_QUICK_TOOLS.edit) && <TableCell />}
            {quickTools.includes(TABLE_QUICK_TOOLS.delete) && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 &&
            rows.map((row, index) => (
              <Row key={row.id} row={row} index={index} />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MainTable;
