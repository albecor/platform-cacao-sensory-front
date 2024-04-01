import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(({ palette, typography, functions, borders }) => {
  const { gradients, transparent, white, secondary } = palette;
  const { size, fontWeightMedium } = typography;
  const { linearGradient, pxToRem } = functions;
  const { borderWidth } = borders;

  return {
    timelineItem: {
      position: "relative",

      "&:after": {
        content: "''",
        position: "absolute",
        top: "10%",
        left: "14px",
        height: ({ lastItem }) => (lastItem ? "90%" : "100%"),
        borderRight: `${borderWidth[2]} solid ${secondary.main}`,
      },
    },

    timelineItem_iconBox: {
      width: pxToRem(26),
      height: pxToRem(26),
      borderRadius: "50%",
      backgroundColor: white.main,
      position: "absolute",
      top: "3.25%",
      left: "2px",
      zIndex: 2,
    },

    timelineItem_icon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-52%, -50%)",
      fontSize: size.xl,
      fontWeight: fontWeightMedium,
      zIndex: 1,
      backgroundImage: ({ color }) =>
        linearGradient(gradients[color].main, gradients[color].state),
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: transparent.main,
    },
  };
});
