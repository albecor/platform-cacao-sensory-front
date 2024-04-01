import { forwardRef } from "react";

import PropTypes from "prop-types";

import clsx from "clsx";

import Button from "@material-ui/core/Button";

import styles from "components/SuiButton/styles";

const SuiButton = forwardRef(
  (
    {
      buttonColor,
      variant,
      size,
      circular,
      iconOnly,
      children,
      customClass,
      ...rest
    },
    ref
  ) => {
    const classes = styles({ buttonColor, variant, size, iconOnly });

    return (
      <Button
        {...rest}
        ref={ref}
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        className={clsx(classes[variant], customClass, {
          [classes.circular]: circular,
          [classes.iconOnly]: iconOnly,
        })}
      >
        {children}
      </Button>
    );
  }
);

// Setting default values for the props of SuiButton
SuiButton.defaultProps = {
  size: "medium",
  variant: "contained",
  buttonColor: "white",
  circular: false,
  iconOnly: false,
  customClass: "",
};

// Typechecking props for the SuiButton
SuiButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  buttonColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "greenDark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
};

export default SuiButton;
