import { makeStyles } from "@material-ui/core/styles";
import pxToRem from "assets/theme/functions/pxToRem";

export default makeStyles(() => ({
  buttonSave: {
    display: "flex",
    justifyContent: "end",
  },
  twoColumn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  list: {
    margin: "0",
    paddingLeft: pxToRem(25),
  },
}));
