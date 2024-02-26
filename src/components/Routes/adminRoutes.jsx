import EstimationCharts from "../AdminView/EstimationCharts/EstimationCharts";
import NodesTable from "../AdminView/NodesTable/NodesTable";
import OrdersManagementTable from "../AdminView/OrdersManagement/OrdersManagementTable/OrdersManagementTable";
import UsersManagementTable from "../AdminView/UsersManagement/UsersManagementTable/UsersManagementTable";

const adminRoutes = [
  {
    title: "Available Nodes",
    component: <NodesTable />,
    path: "/nodes-table",
  },
  {
    title: "Charts",
    component: <EstimationCharts />,
    path: "/charts",
  },
  {
    title: "Manage Orders",
    component: <OrdersManagementTable />,
    path: "/manage-orders",
  },
  {
    title: "Manage Users",
    component: <UsersManagementTable />,
    path: "/manage-users",
  },
];

export default adminRoutes;
