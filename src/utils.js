import moment from "moment";
import { NUMBER_UNIT_LIST, ORDER_STATUS_COLORS } from "./constants/constant";

export const formatNumberWithUnits = (number) => {
  if (isNaN(number)) return "";
  let sign = Math.sign(number);
  let unit = 0;

  while (Math.abs(number) > 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 100) / 10;
  }
  return sign * Math.abs(number) + NUMBER_UNIT_LIST[unit];
};

export const ecommerceLocalStorage = {
  get: (key) => {
    if (!localStorage.getItem(key)) return "";
    return JSON.parse(localStorage.getItem(key));
  },
  saveAs: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  clear: () => localStorage.clear(),
};

export const ecommerceSessionStorage = {
  get: (key) => {
    if (!sessionStorage.getItem(key)) return "";
    return JSON.parse(sessionStorage.getItem(key));
  },
  saveAs: (key, data) => sessionStorage.setItem(key, JSON.stringify(data)),
  clear: () => sessionStorage.clear(),
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const getPriceFormat = (priceStr) => {
  return Number(`${priceStr}`.replace(/[^0-9.-]+/g, ""));
};

export const formatPriceToShow = (price) => {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
  };
  return price.toLocaleString("en-US", formatting_options);
};

export const selectColor = (colorNum, colors, opacity) => {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return (
    "hsl(" + ((colorNum * (360 / colors)) % 360) + ",100%,50%," + opacity + ")"
  );
};

export const dateFormatter = (str, format) => {
  return moment(str).format(format || "MMM DD, YYYY (hh:mm A)");
};

export const tdOrderStatusFormat = (status) => {
  return (
    <>
      <div
        className="orderStatusPill ellipsis"
        style={{ backgroundColor: ORDER_STATUS_COLORS[status] || "gray" }}
      >
        {status}
      </div>
    </>
  );
};

export const navigateToProductDetailsPage = (asin = "") => {
  const cleanedAsin = asin.replace(/\u200E/g, ""); // Remove the LEFT-TO-RIGHT MARK character
  const encodedAsin = encodeURIComponent(cleanedAsin);
  const path = "/items/" + encodedAsin;
  window.location.href = path;
};
