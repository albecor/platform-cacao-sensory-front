import { Tooltip } from "@material-ui/core";
import { bool, func, shape, string } from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import { isStrongPws } from "utils";

const PasswordInput = ({
  callback,
  control,
  label,
  name,
  passwordError,
  tooltip,
}) => {
  const [type, setType] = useState(true);
  return (
    <SuiBox mb={2}>
      <SuiBox mb={1} ml={0.5} customClass={tooltip ? "help-label" : ""}>
        {tooltip ? (
          <Tooltip
            title="La contraseña debe tener: Mìnimo 8 caracteres, un símbolo, un número, una mayúscula y una minúscula"
            placement="top"
          >
            <SuiTypography
              component="label"
              textColor="title"
              variant="caption"
              fontWeight="bold"
            >
              {label}
            </SuiTypography>
          </Tooltip>
        ) : (
          <SuiTypography
            component="label"
            textColor="title"
            variant="caption"
            fontWeight="bold"
          >
            {label}
          </SuiTypography>
        )}
      </SuiBox>
      <Controller
        name={name}
        control={control}
        rules={{ required: true, validate: isStrongPws }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SuiInput
            withIcon={{
              direction: "right",
              icon: type ? "visibility" : "visibility_off",
              onClick: () => setType((prevState) => !prevState),
            }}
            type={type ? "password" : "text"}
            name={name}
            placeholder="Contraseña"
            value={value}
            error={!!error}
            helperText={
              (passwordError?.type === "required" &&
                "Contraseña es requerida") ||
              (passwordError?.type === "validate" && "Contraseña no válida")
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
};

PasswordInput.defaultProps = {
  callback: () => {},
  label: "Contraseña",
  name: "password",
  passwordError: null,
  tooltip: false,
};

PasswordInput.propTypes = {
  callback: func,
  control: shape().isRequired,
  label: string,
  name: string,
  passwordError: shape({
    type: string,
  }),
  tooltip: bool,
};

export default PasswordInput;
