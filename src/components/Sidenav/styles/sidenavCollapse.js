import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(
  ({
    palette,
    transitions,
    breakpoints,
    typography,
    boxShadows,
    borders,
    functions,
  }) => {
    const { secondary, white, text, gradients, light, transparent } = palette;
    const { fontWeightBold, fontWeightMedium, size } = typography;
    const { regular, xxl } = boxShadows;
    const { borderRadius } = borders;
    const { pxToRem } = functions;

    return {
      collapse_item: {
        background: ({ active }) =>
          active ? secondary.focus : transparent.main,
        color: ({ active }) => (active ? secondary.main : text.main),
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(
          16
        )}`,
        margin: `0 ${pxToRem(16)}`,
        borderRadius: borderRadius.md,
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        boxShadow: "none",
        [breakpoints.up("xl")]: {
          boxShadow: ({ active }) => (active ? xxl : "none"),
          transition: transitions.create("box-shadow", {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.shorter,
          }),
        },
      },

      collapse_iconBox: {
        background: ({ active }) => (active ? secondary.main : light.main),
        minWidth: pxToRem(32),
        minHeight: pxToRem(32),
        borderRadius: borderRadius.md,
        display: "grid",
        placeItems: "center",
        boxShadow: regular,
        transition: transitions.create("margin", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),

        [breakpoints.up("xl")]: {
          background: ({ active, transparentSidenav }) => {
            let background;

            if (!active) {
              background = transparentSidenav ? white.main : light.main;
            } else {
              background = secondary.main;
            }

            return background;
          },
        },

        "& svg, svg g": {
          fill: ({ active }) =>
            active ? white.main : gradients.greenDark.state,
        },
      },

      collapse_icon: {
        color: ({ active }) =>
          active ? white.main : gradients.greenDark.state,
      },

      collapse_text: {
        marginLeft: pxToRem(12.8),

        [breakpoints.up("xl")]: {
          opacity: ({ miniSidenav, transparentSidenav }) =>
            miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
          maxWidth: ({ miniSidenav, transparentSidenav }) =>
            miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
          marginLeft: ({ miniSidenav, transparentSidenav }) =>
            miniSidenav || (miniSidenav && transparentSidenav)
              ? 0
              : pxToRem(12.8),
          transition: transitions.create(["opacity", "margin"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },

        "& span": {
          fontWeight: ({ active }) =>
            active ? fontWeightBold : fontWeightMedium,
          fontSize: size.sm,
          lineHeight: 0,
        },
      },
    };
  }
);
