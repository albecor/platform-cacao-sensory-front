import { bool, func, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import { isMobile } from "utils";

const MobileInput = ({
  callback,
  control,
  defaultValue,
  mobileError,
  name,
  required,
}) => (
  <SuiBox mb={2}>
    <SuiBox mb={1} ml={0.5}>
      <SuiTypography
        component="label"
        textColor="title"
        variant="caption"
        fontWeight="bold"
      >
        Número de celular{required ? " *" : ""}
      </SuiTypography>
    </SuiBox>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required,
        validate: (val) => {
          if (val === "" && !required) return true;
          return isMobile(val.toString());
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SuiInput
          type="tel"
          name={name}
          placeholder=""
          value={value}
          error={!!error}
          helperText={
            (mobileError?.type === "required" && "Teléfono es requerido") ||
            (mobileError?.type === "validate" && "Teléfono no válido")
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

MobileInput.defaultProps = {
  callback: () => {},
  defaultValue: "",
  mobileError: null,
  name: "mobile",
  required: true,
};

MobileInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  mobileError: shape({
    type: string,
  }),
  name: string,
  required: bool,
};

export default MobileInput;
