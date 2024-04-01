import { arrayOf, bool, func, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiInput/select";

const SelectInput = ({
  callback,
  control,
  defaultValue,
  label,
  placeholder,
  name,
  options,
  required,
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
      rules={{ required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SuiSelect
          error={!!error}
          options={options}
          value={options.find((c) => c.value === value) || ""}
          onChange={(val) => {
            onChange(val.value);
            if (callback) callback(val);
          }}
          placeholder={placeholder || label}
          {...rest}
        />
      )}
    />
  </SuiBox>
);

SelectInput.defaultProps = {
  callback: () => {},
  defaultValue: "",
  options: [],
  placeholder: null,
  required: true,
};

SelectInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  label: string.isRequired,
  placeholder: string,
  name: string.isRequired,
  required: bool,
  options: arrayOf(shape({ value: string, label: string })),
};

export default SelectInput;
