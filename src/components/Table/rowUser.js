import { func, string } from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

const RowUser = ({ name, email }) => (
  <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="button" fontWeight="medium">
        {name}
      </SuiTypography>
      <SuiTypography variant="caption" textColor="secondary">
        {email}
      </SuiTypography>
    </SuiBox>
  </SuiBox>
);

RowUser.Rol = ({ rol }) => (
  <SuiBox display="flex" flexDirection="column">
    <SuiTypography variant="caption" fontWeight="medium" textColor="text">
      {rol}
    </SuiTypography>
  </SuiBox>
);

RowUser.Actions = ({ primaryAction }) => (
  <SuiBox
    display="flex"
    alignItems="center"
    mt={{ xs: 2, sm: 0 }}
    ml={{ xs: -1.5, sm: 0 }}
  >
    <SuiBox mr={1}>
      <Tooltip title="Editar Usuario" placement="top">
        <SuiButton onClick={primaryAction} variant="text" buttonColor="dark">
          <Icon className="material-icons-round">edit</Icon>
        </SuiButton>
      </Tooltip>
    </SuiBox>
  </SuiBox>
);

RowUser.Actions.propTypes = {
  primaryAction: func.isRequired,
};

RowUser.Rol.propTypes = {
  rol: string.isRequired,
};
RowUser.propTypes = {
  email: string.isRequired,
  name: string.isRequired,
};

export default RowUser;
