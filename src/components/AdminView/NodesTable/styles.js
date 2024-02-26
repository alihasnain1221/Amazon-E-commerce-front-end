import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  NTCard: {
    width: "75%",
    textAlignLast: "center",
    marginInline: "auto",
  },
  NTTable: {
    width: "100%",
  },
  NTTableHeader: {
    marginBlock: "20px",
    padding: "15px",
  },
  NTTableHeaderInfo: {
    margin: "15px",
    display: "flex",
    justifyContent: "space-between",
    textAlignLast: "start",
  },
  iconImg: {
    width: "0.5em",
    height: "0.5em",
  },
  tableTh: {
    fontWeight: "bold !important",
  },
  tableHeaderRow: {
    backgroundColor: "var(--primary-color)",
  },
  productEstRefereshIcon: {
    width: "15px",
    height: "15px",
  },
}));
