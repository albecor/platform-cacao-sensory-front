import { func, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { nameRegex } from "utils/constants";

const NameInput = ({ callback, control, defaultValue, nameError }) => (
  <SuiBox mb={2}>
    <SuiBox mb={1} ml={0.5}>
      <SuiTypography
        component="label"
        textColor="title"
        variant="caption"
        fontWeight="bold"
      >
        Nombre *
      </SuiTypography>
    </SuiBox>
    <Controller
      name="name"
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: true,
        minLength: 2,
        pattern: nameRegex,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SuiInput
          type="text"
          name="name"
          placeholder="Nombre"
          value={value}
          error={!!error}
          helperText={
            (nameError?.type === "required" && "Nombre es requerido") ||
            (nameError?.type === "minLength" && "Nombre muy corto") ||
            (nameError?.type && "Nombre no válido")
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

NameInput.defaultProps = {
  callback: () => {},
  defaultValue: "",
  nameError: null,
};

NameInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  nameError: shape({
    type: string,
  }),
};

export default NameInput;
