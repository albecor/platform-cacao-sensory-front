import Icon from "@material-ui/core/Icon";
import { useCallback, useState } from "react";

import Fade from "@material-ui/core/Fade";

import SuiBox from "components/SuiBox";

import styles from "components/SuiAlert/styles";
import SuiTypography from "../SuiTypography";

const suiAlert = ({ color, dismissible = false }) => {
  const [alertStatus, setAlertStatus] = useState(false);
  const classes = styles({ color });
  const handleAlertStatus = () => setAlertStatus((prevState) => !prevState);
  const alertTemplate = useCallback(
    ({ icon, title, body, ...rest }) => (
      <Fade in={alertStatus} appear>
        <SuiBox {...rest} customClass={classes.alert}>
          <SuiBox display="flex" alignItems="center">
            {icon && (
              <Icon className="material-icons-round" fonSize="small">
                {icon}
              </Icon>
            )}
            <SuiBox>
              <SuiTypography
                variant="body2"
                fontWeight="bold"
                textColor="white"
              >
                {title}
              </SuiTypography>
              <SuiTypography variant="body2" textColor="white">
                {body}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          {dismissible && (
            <SuiBox
              component="span"
              customClass={classes.alert_closeIcon}
              onClick={alertStatus && handleAlertStatus}
            >
              &times;
            </SuiBox>
          )}
        </SuiBox>
      </Fade>
    ),
    [alertStatus]
  );
  return {
    SuiAlert: alertTemplate,
    setAlertStatus,
  };
};

export default suiAlert;
