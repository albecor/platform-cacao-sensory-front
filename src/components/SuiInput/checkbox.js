import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { string } from "prop-types";

const SuiCheckbox = ({ label, ...rest }) => (
  <>
    {label ? (
      <FormControlLabel control={<Checkbox {...rest} />} label={label} />
    ) : (
      <Checkbox {...rest} />
    )}
  </>
);

SuiCheckbox.defaultProps = {
  label: null,
};
SuiCheckbox.propTypes = {
  label: string,
};

export default SuiCheckbox;
