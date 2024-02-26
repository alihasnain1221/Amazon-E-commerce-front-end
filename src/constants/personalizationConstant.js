import { ALIGN_OPTIONS, TABLE_COLUMN_TYPE } from "./constant";

export const ORDERS_TABLE_HEADERS = [
  {
    itemKey: "createdAt",
    title: "Created At",
    label: "Created At",
    type: TABLE_COLUMN_TYPE.longDate,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "id",
    title: "Order ID",
    label: "Order ID",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "status",
    title: "Status",
    label: "Status",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "ttlProducts",
    title: "Products",
    label: "Products",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "ttlQuantity",
    title: "Total Quantity",
    label: "Total Quantity",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
];

export const ORDERS_COLLAPSE_TABLE_HEADERS = [
  {
    itemKey: "asin",
    title: "Asin",
    label: "Asin",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "name",
    title: "Title",
    label: "Title",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
    cssClass: "w-50",
  },
  {
    itemKey: "quantity",
    title: "Quantity",
    label: "Quantity",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "productImg",
    title: "Image",
    label: "Image",
    customCellRender: true,
  },
];

export const MANAGEABLE_ORDERS_TABLE_HEADERS = [
  {
    itemKey: "createdAt",
    title: "Created At",
    label: "Created At",
    type: TABLE_COLUMN_TYPE.longDate,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "id",
    title: "Order ID",
    label: "Order ID",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "userId",
    title: "User ID",
    label: "User ID",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "status",
    title: "Status",
    label: "Status",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "ttlProducts",
    title: "Products",
    label: "Products",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "ttlQuantity",
    title: "Total Quantity",
    label: "Total Quantity",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "actions",
    title: "Actions",
    label: "Actions",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "delivered",
    title: "Delivered",
    label: "Delivered",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
];

export const MANAGEABLE_ORDERS_COLLAPSE_TABLE_HEADERS = [
  {
    itemKey: "asin",
    title: "Asin",
    label: "Asin",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "name",
    title: "Title",
    label: "Title",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
    cssClass: "w-50",
  },
  {
    itemKey: "quantity",
    title: "Quantity",
    label: "Quantity",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "productImg",
    title: "Image",
    label: "Image",
    customCellRender: true,
  },
];

export const NODES_TABLE_HEADERS = [
  {
    itemKey: "name",
    title: "Name",
    label: "Name",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.inherit,
  },
  {
    itemKey: "nodeId",
    title: "Node id",
    label: "Node id",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "amazonNodeId",
    title: "Amazon Category Id",
    label: "Amazon Category Id",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "domain",
    title: "Domain",
    label: "Domain",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "quantity",
    title: "Available Products",
    label: "Available Products",
    customCellRender: true,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "weeklySalesEstimation",
    title: "Weekly Estimations",
    label: "Weekly Est.",
    customCellRender: true,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "monthlySalesEstimation",
    title: "Monthly Estimations",
    label: "Monthly Est.",
    customCellRender: true,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "visible",
    title: "Visible",
    label: "Visible",
    customCellRender: true,
    align: ALIGN_OPTIONS.right,
  },
];

export const NODES_COLLAPSE_TABLE_HEADERS = [
  {
    itemKey: "asin",
    title: "Asin",
    label: "Asin",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "name",
    title: "Title",
    label: "Title",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "weeklySalesEstimation",
    title: "Weekly Estimations",
    label: "Weekly Est.",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "monthlySalesEstimation",
    title: "Monthly Estimations",
    label: "Monthly Est.",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.right,
  },
  {
    itemKey: "refereshEstimation",
    title: "Referesh Estimations",
    label: "Referesh Est.",
    customCellRender: true,
    align: ALIGN_OPTIONS.right,
  },
];

export const MANAGEABLE_USERS_TABLE_HEADERS = [
  {
    itemKey: "username",
    title: "Username",
    label: "Username",
    customCellRender: true,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "email",
    title: "Email",
    label: "Email",
    type: TABLE_COLUMN_TYPE.email,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "phone",
    title: "Phone",
    label: "Phone",
    type: TABLE_COLUMN_TYPE.phone,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "role",
    title: "Role",
    label: "Role",
    type: TABLE_COLUMN_TYPE.upperCaseText,
    align: ALIGN_OPTIONS.center,
  },
  {
    itemKey: "address",
    title: "Address",
    label: "Address",
    type: TABLE_COLUMN_TYPE.text,
    align: ALIGN_OPTIONS.center,
    cssClass: "ellipsis addressColumn"
  },
];
