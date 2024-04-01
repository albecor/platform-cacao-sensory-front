import { Icon } from "@material-ui/core";
import SuiBox from "components/SuiBox";
import { func, string } from "prop-types";

const FabButton = ({ onClick, icon }) => (
  <SuiBox
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="3.5rem"
    height="3.5rem"
    backgroundColor="greenDark"
    boxShadow="sm"
    borderRadius="50%"
    position="fixed"
    right="2rem"
    bottom="2rem"
    zIndex={99}
    customClass="cursor-pointer"
    onClick={onClick}
  >
    <Icon className="text-light" fontSize="medium">
      {icon}
    </Icon>
  </SuiBox>
);

FabButton.defaultProps = {
  icon: "add",
};

FabButton.propTypes = {
  onClick: func.isRequired,
  icon: string,
};

export default FabButton;
