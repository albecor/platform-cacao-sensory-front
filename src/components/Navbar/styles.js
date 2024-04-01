import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(
  ({ palette, functions, transitions, breakpoints, borders, typography }) => {
    const { text, transparent } = palette;
    const { pxToRem } = functions;
    const { borderRadius } = borders;
    const { size } = typography;

    return {
      navbar: {
        boxShadow: "none",
        backdropFilter: "none",
        backgroundColor: transparent.main,

        color: text.main,
        top: 0,
        minHeight: pxToRem(75),
        display: "grid",
        alignItems: "center",
        borderRadius: borderRadius.xl,
        paddingTop: pxToRem(8),
        paddingBottom: pxToRem(8),
        paddingRight: pxToRem(8),
        paddingLeft: pxToRem(16),

        "& > *": {
          transition: transitions.create("all", {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },

        "& .MuiToolbar-root": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          [breakpoints.up("sm")]: {
            minHeight: "auto",
            padding: `${pxToRem(4)} ${pxToRem(16)}`,
          },
        },
      },

      navbar_container: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingTop: pxToRem(4),
        paddingBottom: pxToRem(4),

        [breakpoints.up("md")]: {
          flexDirection: "row",
          alignItems: "center",
          paddingTop: "0",
          paddingBottom: "0",
        },
      },

      navbar_row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "stretch",

        [breakpoints.up("md")]: {
          justifyContent: "stretch",
          width: "max-content",
        },

        [breakpoints.up("xl")]: {
          justifyContent: "stretch !important",
          width: "max-content !important",
        },
      },

      navbar_icon_button: {
        padding: `0 ${pxToRem(6)}`,

        "& .material-icons": {
          fontSize: size.regular,
        },

        "& .MuiTypography-root": {
          display: "none",

          [breakpoints.up("sm")]: {
            display: "inline-block",
            lineHeight: 1.2,
            marginLeft: pxToRem(4),
          },
        },
      },

      navbar_mobile_menu: {
        display: "inline-block",

        [breakpoints.up("xl")]: {
          display: "none",
        },
      },

      greeting: {
        marginRight: pxToRem(6),
      },
    };
  }
);
