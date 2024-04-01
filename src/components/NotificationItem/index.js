import { forwardRef } from "react";

import PropTypes from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import styles from "./styles";

const NotificationItem = forwardRef(({ color, title, date, ...rest }, ref) => {
  const classes = styles({ color });

  return (
    <MenuItem {...rest} ref={ref} className={classes.notificationItem}>
      <SuiBox>
        <SuiTypography
          variant="button"
          textTransform="capitalize"
          fontWeight="regular"
        >
          <strong>{title[0]}</strong> {title[1]}
        </SuiTypography>
        <SuiTypography
          variant="caption"
          textColor="secondary"
          customClass={classes.notificationItem_date}
        >
          <SuiTypography variant="button" textColor="secondary">
            <Icon
              className={`material-icon-round ${classes.notificationItem_icon}`}
            >
              watch_later
            </Icon>
          </SuiTypography>
          {date}
        </SuiTypography>
      </SuiBox>
    </MenuItem>
  );
});

NotificationItem.defaultProps = {
  color: "dark",
};

NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export default NotificationItem;
