import { bool, func, oneOfType, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";

const TextInput = ({
  callback,
  control,
  defaultValue,
  customError,
  label,
  placeholder,
  name,
  rules,
  type,
  ...rest
}) => (
  <SuiBox mb={2}>
    <SuiBox mb={1} ml={0.5}>
      <SuiTypography
        component="label"
        textColor="title"
        variant="caption"
        fontWeight="bold"
      >
        {label}
      </SuiTypography>
    </SuiBox>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SuiInput
          {...rest}
          type={type}
          name={name}
          placeholder={placeholder || label}
          value={value}
          error={!!error}
          helperText={customError}
          onChange={(input) => {
            onChange(input);
            if (callback) callback();
          }}
        />
      )}
    />
  </SuiBox>
);

TextInput.defaultProps = {
  callback: () => {},
  defaultValue: undefined,
  customError: null,
  placeholder: null,
  type: "text",
  rules: { required: true },
};

TextInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  label: string.isRequired,
  placeholder: string,
  name: string.isRequired,
  customError: oneOfType([bool, string]),
  rules: shape({}),
  type: string,
};

export default TextInput;
