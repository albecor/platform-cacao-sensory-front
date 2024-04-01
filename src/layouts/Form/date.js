import "date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { func, instanceOf, oneOfType, shape, string } from "prop-types";
import { Controller } from "react-hook-form";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

const DateInput = ({ callback, control, defaultValue, label, name, rules }) => (
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            disablePast
            margin="normal"
            id="date-picker-dialog"
            minDate={new Date()}
            label=""
            format="yyyy/MM/dd"
            value={value}
            onChange={(input) => {
              onChange(input);
              if (callback) callback();
            }}
            error={!!error}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  </SuiBox>
);

DateInput.defaultProps = {
  callback: () => {},
  defaultValue: undefined,
  rules: { required: true },
};

DateInput.propTypes = {
  callback: func,
  control: shape({}).isRequired,
  defaultValue: oneOfType([string, instanceOf(Date)]),
  label: string.isRequired,
  name: string.isRequired,
  rules: shape({}),
};

export default DateInput;
