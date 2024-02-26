import {
  Avatar,
  Card,
  Chip,
  Paper,
  Stack,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../../../assets/user-1.png";
import { MANAGEABLE_USERS_TABLE_HEADERS } from "../../../../constants/personalizationConstant";
import {
  deleteUser,
  getAllUsers,
  profileSideBar,
} from "../../../../state/actions";
import MainTable from "../../../MainTable/MainTable";
import useStyles from "./styles";
import { TABLE_QUICK_TOOLS } from "../../../../constants/constant";
import UserUpdateModal from "../../../modals/UserUpdateModal/UserUpdateModal";

const UsersManagementTable = () => {
  const classes = useStyles();
  const { users } = useSelector((state) => state);
  const { user: self } = useSelector((state) => state.auth);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const quickTools = [TABLE_QUICK_TOOLS.edit, TABLE_QUICK_TOOLS.delete];
  const dispatch = useDispatch();

  const handleCellClick = (e, row, key) => {
    switch (key) {
      case TABLE_QUICK_TOOLS.edit:
        if (row.id !== self.id) setUserToUpdate(row);
        break;

      case TABLE_QUICK_TOOLS.delete:
        if (row.id !== self.id) dispatch(deleteUser(row.id));
        break;

      default:
        break;
    }
  };

  const renderTd = (column, row, index) => {
    switch (column.itemKey) {
      case "username":
        return (
          <>
            <TableCell key={index} align={column.align}>
              <Stack justifyContent={column.align} direction="row" spacing={1}>
                <Chip
                  className={`ellipsis ${classes.userChip}`}
                  onClick={() => dispatch(profileSideBar(row))}
                  avatar={<Avatar alt="User" src={userIcon} />}
                  label={row.username}
                  title={row.username}
                  variant="outlined"
                />
              </Stack>
            </TableCell>
          </>
        );

      default:
        return (
          <TableCell key={index} align={column.align}>
            {row[column.itemKey]}
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
            Manage Users
          </Typography>
          <div className={classes.NTTableHeaderInfo}>
            <div>
              <Typography variant="p" component="p">
                Total Available Users: {users?.length || 0}
              </Typography>
            </div>
          </div>
          <MainTable
            columns={MANAGEABLE_USERS_TABLE_HEADERS}
            rows={users}
            showSrNumColumn
            quickTools={quickTools}
            handleCellClick={handleCellClick}
            customCellRenderer={(column, row, index) =>
              renderTd(column, row, index)
            }
          />
        </TableContainer>
        {userToUpdate && (
          <UserUpdateModal
            handleClose={(updated) => {
              setUserToUpdate(null);
              if (updated) dispatch(getAllUsers());
            }}
            user={userToUpdate}
          />
        )}
      </Card>
    </>
  );
};

export default UsersManagementTable;
