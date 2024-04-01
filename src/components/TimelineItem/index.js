import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import styles from "./styles";

function TimelineItem({
  color,
  icon,
  title,
  extraTime,
  dateTime,
  description,
  notes,
  lastItem,
}) {
  const classes = styles({ color, lastItem });

  return (
    <SuiBox customClass={classes.timelineItem}>
      <SuiBox customClass={classes.timelineItem_iconBox}>
        <Icon className={`material-icons-round ${classes.timelineItem_icon}`}>
          {icon}
        </Icon>
      </SuiBox>
      <SuiBox
        ml={5.75}
        pt={description ? 0.7 : 0.5}
        lineHeight={0}
        maxWidth="30rem"
      >
        <SuiTypography variant="button" fontWeight="medium" textColor="dark">
          {title}
        </SuiTypography>
        <SuiBox mt={0.5}>
          <SuiTypography variant="caption" fontWeight="medium" textColor="text">
            {dateTime}
          </SuiTypography>
          <br />
          {extraTime && (
            <SuiTypography
              variant="caption"
              fontWeight="medium"
              textColor="text"
            >
              {extraTime}
            </SuiTypography>
          )}
          <br />
          {notes && (
            <SuiTypography
              variant="caption"
              fontWeight="medium"
              textColor="text"
            >
              {notes}
            </SuiTypography>
          )}
        </SuiBox>
        <SuiBox mt={1} mb={1.5}>
          <SuiTypography variant="button" fontWeight="regular" textColor="text">
            {description}
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

TimelineItem.defaultProps = {
  color: "greenDark",
  lastItem: false,
  description: "",
  extraTime: null,
  notes: null,
};

TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "greenDark",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  extraTime: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  lastItem: PropTypes.bool,
  notes: PropTypes.string,
};

export default TimelineItem;
