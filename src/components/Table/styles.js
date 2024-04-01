/* eslint-disable no-nested-ternary */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(({ functions, palette }) => {
  const { pxToRem } = functions;
  const { secondary, title } = palette;
  return {
    headerContainer: ({ hasSort }) => ({
      cursor: hasSort ? "pointer" : "default",
      position: "relative",
    }),
    sortContainer: {
      position: "absolute",
      top: pxToRem(12),
      right: pxToRem(120),
      left: "unset",
    },
    sortUp: ({ sort }) => ({
      color:
        typeof sort === "undefined"
          ? secondary.main
          : sort
          ? secondary.main
          : title.main,
      position: "absolute",
      top: "-6px",
    }),
    sortDown: ({ sort }) => ({
      color:
        typeof sort === "undefined"
          ? secondary.main
          : !sort
          ? secondary.main
          : title.main,
      position: "absolute",
      top: 0,
    }),
  };
});
