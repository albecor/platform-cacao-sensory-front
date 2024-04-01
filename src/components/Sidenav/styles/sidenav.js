import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(
  ({
    palette,
    typography,
    boxShadows,
    transitions,
    breakpoints,
    functions,
    borders,
  }) => {
    const sidebarWidth = 250;
    const { black, background, secondary, text } = palette;
    const { fontWeightMedium } = typography;
    const { borderRadius } = borders;
    const { xxl } = boxShadows;
    const { pxToRem } = functions;

    return {
      sidenav: {
        boxShadow: xxl,
        border: "none",

        [breakpoints.up("xl")]: {
          backgroundColor: background.default,
          boxShadow: "none",
          marginBottom: 0,
          left: "0",
        },
      },

      sidenav_header: {
        padding: `${pxToRem(24)} ${pxToRem(32)} ${pxToRem(8)}`,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      },

      sidenav_logo: {
        width: pxToRem(32),
      },

      sidenav_logoLabel: {
        marginLeft: pxToRem(4),
        fontWeight: fontWeightMedium,
        wordSpacing: pxToRem(-1),
        transition: transitions.create("opacity", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),

        [breakpoints.up("xl")]: {
          opacity: ({ miniSidenav }) => (miniSidenav ? 0 : 1),
        },
      },

      sidenav_title: {
        display: "block",
        opacity: 0.6,
        paddingLeft: pxToRem(24),
        margin: `${pxToRem(16)} 0 ${pxToRem(8)} ${pxToRem(8)}`,
      },

      sidenav_open: {
        transform: "translateX(0)",
        transition: transitions.create("transform", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),

        [breakpoints.up("xl")]: {
          width: sidebarWidth,
          transform: "translateX(0)",
          transition: transitions.create(["width", "background-color"], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
          }),
        },
      },

      sidenav_close: {
        transform: `translateX(${pxToRem(-320)})`,
        transition: transitions.create("transform", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),

        [breakpoints.up("xl")]: {
          width: pxToRem(96),
          overflowX: "hidden",
          transform: "translateX(0)",
          transition: transitions.create(["width", "background-color"], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
        },
      },

      sidenav_navlink: {
        padding: 0,
        textTransform: "capitalize",
        borderColor: "transparent",
        backgroundColor: "transparent",
      },

      nested_container: {
        marginLeft: pxToRem(24),
        paddingLeft: pxToRem(16),
      },

      nested_route: {
        alignItems: "center",
        display: "flex",
        position: "relative",
        "&:before": {
          content: "''",
          width: pxToRem(6),
          height: pxToRem(6),
          backgroundColor: secondary.focus,
          borderRadius: borderRadius.sm,
        },
      },
      nested_route_active: {
        "&:before": {
          backgroundColor: secondary.main,
          width: pxToRem(8),
          height: pxToRem(8),
        },
      },

      nested_text: {
        color: text.main,
      },
      nested_text_active: {
        color: black.focus,
      },
    };
  }
);
