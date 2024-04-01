import { bool, func, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiInput/select";
import { useCacaoContext } from "context";

const RolInput = ({ callback, control, defaultValue, disabled, rolError }) => {
  const [controller] = useCacaoContext();
  const options = controller.roles.map(({ _id, description }) => ({
    value: _id,
    label: description,
  }));
  return (
    <SuiBox mb={2}>
      <SuiBox mb={1} ml={0.5}>
        <SuiTypography
          component="label"
          textColor="title"
          variant="caption"
          fontWeight="bold"
        >
          Rol *
        </SuiTypography>
      </SuiBox>
      <Controller
        name="rol"
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SuiSelect
            error={!!error}
            options={options}
            value={options.find((c) => c.value === value)}
            onChange={(val) => {
              onChange(val.value);
              if (callback) callback();
            }}
            disabled={disabled}
            placeholder="Seleccione"
            helperText={rolError?.type === "required" && "Rol es requerido"}
          />
        )}
      />
    </SuiBox>
  );
};

RolInput.defaultProps = {
  callback: () => {},
  defaultValue: "",
  disabled: false,
  rolError: null,
};

RolInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  disabled: bool,
  rolError: shape({
    type: string,
  }),
};

export default RolInput;
