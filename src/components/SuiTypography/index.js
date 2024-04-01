import { forwardRef } from "react";

import PropTypes from "prop-types";

import clsx from "clsx";

import Typography from "@material-ui/core/Typography";

import styles from "components/SuiTypography/styles";

const SuiTypography = forwardRef(
  (
    {
      textColor,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      customClass,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = styles({
      textColor,
      textTransform,
      verticalAlign,
      opacity,
    });

    return (
      <Typography
        {...rest}
        ref={ref}
        className={clsx(classes.suiTypography, customClass, {
          [classes[`suiTypography_${fontWeight}`]]: fontWeight,
          [classes.suiTypography_textTransform]: textTransform,
          [classes.suiTypography_verticalAlign]: verticalAlign,
          [classes.suiTypography_textGradient]: textGradient,
        })}
      >
        {children}
      </Typography>
    );
  }
);

SuiTypography.defaultProps = {
  textColor: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
  customClass: "",
};

SuiTypography.propTypes = {
  textColor: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "title",
    "white",
    "greenDark",
    "red",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf([
    "none",
    "capitalize",
    "uppercase",
    "lowercase",
  ]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
  customClass: PropTypes.string,
};

export default SuiTypography;
