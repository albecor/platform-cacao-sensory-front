import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(({ palette, typography, functions }) => {
  const { gradients, transparent } = palette;
  const {
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
  } = typography;
  const { linearGradient } = functions;

  return {
    suiTypography: {
      color: ({ textColor }) =>
        textColor === "inherit" ? "inherit" : palette[textColor].main,
      opacity: ({ opacity }) => opacity,
      textDecoration: "none",
    },

    suiTypography_light: {
      fontWeight: fontWeightLight,
    },

    suiTypography_regular: {
      fontWeight: fontWeightRegular,
    },

    suiTypography_medium: {
      fontWeight: fontWeightMedium,
    },

    suiTypography_bold: {
      fontWeight: fontWeightBold,
    },

    suiTypography_textTransform: {
      textTransform: ({ textTransform }) => textTransform,
    },

    suiTypography_verticalAlign: {
      verticalAlign: ({ verticalAlign }) => verticalAlign,
    },

    suiTypography_textGradient: {
      backgroundImage: ({ textColor }) =>
        textColor !== "inherit" &&
        textColor !== "text" &&
        textColor !== "white" &&
        linearGradient(gradients[textColor].main, gradients[textColor].state),
      display: "inline-block",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: transparent.main,
      position: "relative",
      zIndex: 1,
    },
  };
});
