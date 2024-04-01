import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  allBorder: {
    border: "solid 1px black",
  },
  borderLeft: {
    borderLeft: "solid 1px black",
  },
  borderRight: {
    borderRight: "solid 1px black",
  },
  borderTop: {
    borderTop: "solid 1px black",
  },
  borderBottom: {
    borderBottom: "solid 1px black",
  },
  divider: {
    display: "block",
    width: "1px",
    background: "transparent",
    height: "100%",
    border: "none",
    borderLeft: "solid 1px black",
    opacity: 1,
  },
  logoImg: {
    height: "80px",
    margin: "auto",
    padding: "2px",
  },
  total: {
    fontSize: "36px",
  },
}));
