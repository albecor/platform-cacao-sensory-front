import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function MiniStatisticsCard({
  backgroundColor,
  title,
  count,
  percentage,
  icon,
  direction,
}) {
  return (
    <Card>
      <SuiBox backgroundColor={backgroundColor} backgroundGradient>
        <SuiBox p={2}>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <SuiBox
                  backgroundColor={
                    backgroundColor === "white" ? icon.color : "white"
                  }
                  width="3rem"
                  height="3rem"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={backgroundColor === "white" ? "white" : "dark"}
                  boxShadow="md"
                  backgroundGradient
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </SuiBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <SuiBox ml={direction === "left" ? 2 : 0}>
                <SuiTypography
                  variant="button"
                  textColor={backgroundColor === "white" ? "text" : "white"}
                  opacity={backgroundColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SuiTypography>
                <SuiTypography
                  variant="h5"
                  fontWeight="bold"
                  textColor={backgroundColor === "white" ? "dark" : "white"}
                >
                  {count}{" "}
                  <SuiTypography
                    variant="button"
                    textColor={percentage.color}
                    fontWeight="bold"
                  >
                    {percentage.text}
                  </SuiTypography>
                </SuiTypography>
              </SuiBox>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <SuiBox
                  backgroundColor={
                    backgroundColor === "white" ? icon.color : "white"
                  }
                  width="3rem"
                  height="3rem"
                  marginLeft="auto"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={backgroundColor === "white" ? "white" : "dark"}
                  boxShadow="md"
                  backgroundGradient
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </SuiBox>
              </Grid>
            ) : null}
          </Grid>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

MiniStatisticsCard.defaultProps = {
  backgroundColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

MiniStatisticsCard.propTypes = {
  backgroundColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
