import { func, string } from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

const RowProducer = ({ name, document }) => (
  <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="button" fontWeight="medium">
        {name}
      </SuiTypography>
      <SuiTypography variant="caption" textColor="secondary">
        {document}
      </SuiTypography>
    </SuiBox>
  </SuiBox>
);

RowProducer.Phone = ({ phone }) => (
  <SuiBox display="flex" flexDirection="column">
    <SuiTypography variant="caption" fontWeight="medium" textColor="text">
      {phone}
    </SuiTypography>
  </SuiBox>
);

RowProducer.Actions = ({ primaryAction }) => (
  <SuiBox
    display="flex"
    alignItems="center"
    mt={{ xs: 2, sm: 0 }}
    ml={{ xs: -1.5, sm: 0 }}
  >
    <SuiBox mr={1}>
      <Tooltip title="Ver Productor" placement="top">
        <SuiButton onClick={primaryAction} variant="text" buttonColor="dark">
          <Icon className="material-icons-round">visibility</Icon>
        </SuiButton>
      </Tooltip>
    </SuiBox>
  </SuiBox>
);

RowProducer.Actions.propTypes = {
  primaryAction: func.isRequired,
};
RowProducer.Phone.propTypes = {
  phone: string,
};
RowProducer.Phone.defaultProps = {
  phone: "",
};
RowProducer.propTypes = {
  document: string,
  name: string.isRequired,
};
RowProducer.defaultProps = {
  document: "",
};

export default RowProducer;
