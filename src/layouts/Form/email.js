import { func, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { isEmail } from "utils";

const EmailInput = ({ callback, control, defaultValue, emailError }) => (
  <SuiBox mb={2}>
    <SuiBox mb={1} ml={0.5}>
      <SuiTypography
        component="label"
        textColor="title"
        variant="caption"
        fontWeight="bold"
      >
        Correo electrónico*
      </SuiTypography>
    </SuiBox>
    <Controller
      name="email"
      control={control}
      defaultValue={defaultValue}
      rules={{ required: true, validate: isEmail }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SuiInput
          type="email"
          name="email"
          placeholder="Correo"
          value={value}
          error={!!error}
          helperText={
            (emailError?.type === "required" && "Correo es requerido") ||
            (emailError?.type === "validate" && "Correo no válido")
          }
          onChange={(input) => {
            onChange(input);
            if (callback) callback();
          }}
        />
      )}
    />
  </SuiBox>
);

EmailInput.defaultProps = {
  callback: () => {},
  defaultValue: "",
  emailError: null,
};

EmailInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  emailError: shape({
    type: string,
  }),
};

export default EmailInput;
