import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(({ functions, breakpoints, transitions }) => {
  const { pxToRem } = functions;

  return {
    layoutContainer: {
      position: "relative",
      padding: pxToRem(24),

      [breakpoints.up("xl")]: {
        marginLeft: ({ miniSidenav }) =>
          miniSidenav ? pxToRem(120) : pxToRem(274),
        transition: transitions.create(["margin-left", "margin-right"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      },
    },
  };
});
