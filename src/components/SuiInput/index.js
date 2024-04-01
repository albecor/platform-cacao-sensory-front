import { forwardRef } from "react";

import PropTypes, { bool, string } from "prop-types";

import clsx from "clsx";

import InputBase from "@material-ui/core/InputBase";
import FormHelperText from "@material-ui/core/FormHelperText";
import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";

import styles from "components/SuiInput/styles";

const SuiInput = forwardRef(
  (
    {
      size,
      withIcon,
      error,
      success,
      helperText,
      customClass,
      disabled,
      ...rest
    },
    ref
  ) => {
    let template;
    const classes = styles({
      size,
      error,
      success,
      withIcon,
      disabled,
    });

    if (withIcon.icon && withIcon.direction === "left") {
      template = (
        <SuiBox ref={ref} customClass={clsx(classes.suiInputIcon, customClass)}>
          <SuiBox customClass={classes.suiInputIcon_Right}>
            <Icon
              className={`material-icons-round ${classes.suiInputIcon_icon}`}
              fontSize="small"
            >
              {withIcon.icon}
            </Icon>
          </SuiBox>
          <InputBase
            {...rest}
            className={clsx(classes.suiInput, classes.suiInputIcon_input, {
              [classes.suiInput_error]: error,
              [classes.suiInput_success]: success,
              [classes[`suiInput_${size}`]]: size,
            })}
            classes={{
              focused: classes.suiInput_focused,
              disabled: classes.suiInput_disabled,
              error: classes.suiInput_error,
              multiline: classes.suiInput_multiline,
            }}
          />
        </SuiBox>
      );
    } else if (withIcon.icon && withIcon.direction === "right") {
      template = (
        <>
          <SuiBox customClass={clsx(classes.suiInputIcon, customClass)}>
            <InputBase
              {...rest}
              className={clsx(classes.suiInput, classes.suiInputIcon_input, {
                [classes.suiInput_error]: error,
                [classes.suiInput_success]: success,
                [classes[`suiInput_${size}`]]: size,
              })}
              classes={{
                focused: classes.suiInput_focused,
                disabled: classes.suiInput_disabled,
                error: classes.suiInput_error,
                multiline: classes.suiInput_multiline,
              }}
            />
            <SuiBox customClass={classes.suiInputIcon_Right}>
              <Icon
                className={`material-icons-round ${classes.suiInputIcon_icon}`}
                fontSize="small"
                onClick={withIcon.onClick || ""}
              >
                {withIcon.icon}
              </Icon>
            </SuiBox>
          </SuiBox>
          {helperText && (
            <FormHelperText
              className={clsx({ [classes.suiHelperText_error]: error })}
            >
              {helperText}
            </FormHelperText>
          )}
        </>
      );
    } else {
      template = (
        <>
          <InputBase
            {...rest}
            className={clsx(classes.suiInput, customClass, {
              [classes.suiInput_error]: error,
              [classes.suiInput_success]: success,
              [classes[`suiInput_${size}`]]: size,
            })}
            classes={{
              focused: classes.suiInput_focused,
              disabled: classes.suiInput_disabled,
              error: classes.suiInput_error,
              multiline: classes.suiInput_multiline,
            }}
          />
          {helperText && (
            <FormHelperText
              className={clsx({ [classes.suiHelperText_error]: error })}
            >
              {helperText}
            </FormHelperText>
          )}
        </>
      );
    }

    return template;
  }
);

SuiInput.defaultProps = {
  size: "medium",
  withIcon: {
    icon: false,
    direction: "none",
    onClick: null,
  },
  error: false,
  success: false,
  customClass: "",
  helperText: "",
  disabled: false,
};

SuiInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  withIcon: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
    onClick: PropTypes.func,
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  customClass: PropTypes.string,
  helperText: PropTypes.oneOfType([string, bool]),
  disabled: PropTypes.bool,
};

export default SuiInput;
