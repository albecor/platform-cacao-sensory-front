import PropTypes, { bool, string } from "prop-types";

import clsx from "clsx";

import FormHelperText from "@material-ui/core/FormHelperText";

import Styles from "components/SuiInput/styles";
import Select from "react-select";
import colors from "assets/theme/base/colors";

const customStyles = (error) => ({
  control: (styles) => ({
    ...styles,
    borderColor: error
      ? colors.inputColors.error
      : colors.inputColors.borderColor.main,
    backgroundColor: colors.primary.main,
    "&:hover": { borderColor: colors.inputColors.borderColor.focus },
    boxShadow: `0 0 0 1px ${error && colors.inputColors.error}`,
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: colors.primary.main,
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? colors.secondary.focus : colors.primary.main,
    color: isSelected ? colors.secondary.main : colors.text.main,
    fontWeight: isSelected && "bold",
  }),
  menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
});

const SuiSelect = ({
  size,
  withIcon,
  error,
  success,
  helperText,
  customClass,
  disabled,
  ...rest
}) => {
  const classes = Styles({
    size,
    error,
    success,
    withIcon,
    disabled,
  });

  return (
    <>
      <Select
        {...rest}
        isDisabled={disabled}
        styles={customStyles(error)}
        menuPortalTarget={document.body}
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
};

SuiSelect.defaultProps = {
  size: "medium",
  withIcon: {
    icon: false,
    direction: "none",
  },
  error: false,
  success: false,
  customClass: "",
  helperText: "",
  disabled: false,
};

SuiSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  withIcon: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  customClass: PropTypes.string,
  helperText: PropTypes.oneOfType([string, bool]),
  disabled: PropTypes.bool,
};

export default SuiSelect;
