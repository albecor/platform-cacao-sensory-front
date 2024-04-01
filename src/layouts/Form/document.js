import { bool, func, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { isNumeric } from "utils";

const DocumentInput = ({
  callback,
  control,
  defaultValue,
  documentError,
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
        Número de cédula{required ? " *" : ""}
      </SuiTypography>
    </SuiBox>
    <Controller
      name="document"
      control={control}
      defaultValue={defaultValue}
      rules={{
        required,
        validate: (val) => {
          if (val === "" && !required) return true;
          return isNumeric(val.toString());
        },
        minLength: 7,
        maxLength: 11,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SuiInput
          type="number"
          name="document"
          placeholder=""
          value={value}
          error={!!error}
          helperText={
            (documentError?.type === "required" && "Documento es requerido") ||
            (documentError?.type === "validate" && "Documento no válido") ||
            (documentError?.type === "minLength" &&
              "Documento debe ser mínimo de 7") ||
            (documentError?.type === "maxLength" &&
              "Documento debe ser máximo de 11")
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

DocumentInput.defaultProps = {
  callback: () => {},
  defaultValue: "",
  documentError: null,
  required: true,
};

DocumentInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  defaultValue: string,
  documentError: shape({
    type: string,
  }),
  required: bool,
};

export default DocumentInput;
