import { useState } from "react";
import { Grid } from "@material-ui/core";
import { bool, func, shape } from "prop-types";
import DocumentInput from "layouts/Form/document";
import MobileInput from "layouts/Form/mobile";
import NameInput from "layouts/Form/name";
import TextInput from "layouts/Form/text";
import SelectInput from "layouts/Form/select";
import { states } from "utils/constants";
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import { isEmail, isNumeric, parseProfileInfo, parseFincaInfo } from "utils";

export const Step1 = ({ clearState, control, errors, producer }) => (
  <>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={11} sm={6}>
        <NameInput
          callback={clearState}
          control={control}
          nameError={errors.name}
          defaultValue={producer.name}
        />
      </Grid>
      <Grid item xs={11} sm={6}>
        <TextInput
          callback={clearState}
          control={control}
          defaultValue={producer.email}
          name="email"
          label="Correo electrónico"
          rules={{
            required: false,
            validate: (val) => {
              if (val === "" || !val) return true;
              return isEmail(val);
            },
          }}
          customError={errors.email?.type === "validate" && "Correo inválido"}
        />
      </Grid>
    </Grid>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={11} sm={6}>
        <DocumentInput
          callback={clearState}
          control={control}
          defaultValue={producer.document}
          documentError={errors.document}
          required={false}
        />
      </Grid>
      <Grid item xs={11} sm={6}>
        <MobileInput
          callback={clearState}
          control={control}
          defaultValue={producer.phone}
          mobileError={errors.phone}
          name="phone"
          required={false}
        />
      </Grid>
    </Grid>
    <SuiTypography
      component="label"
      textColor="red"
      variant="caption"
      fontWeight="bold"
    >
      Los campos marcados con * son obligatorios
    </SuiTypography>
  </>
);
Step1.propTypes = {
  clearState: func.isRequired,
  control: shape({}).isRequired,
  errors: shape({}).isRequired,
  producer: shape({}).isRequired,
};

export const Step2 = ({
  clearState,
  control,
  errors,
  values,
  getValues,
  hasTitle,
}) => {
  const [cities, setCities] = useState(
    values.state ? states[values.state].cities : []
  );
  return (
    <>
      {hasTitle && (
        <SuiBox mb={2}>
          <SuiTypography variant="body2" textColor="text">
            Opcional: Agrega una finca.
          </SuiTypography>
        </SuiBox>
      )}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <SelectInput
            callback={() => {
              setCities(states[getValues("state")].cities);
              clearState();
            }}
            control={control}
            defaultValue={values.state}
            isSearchable
            name="state"
            label={`Departamento${hasTitle ? "" : "*"}`}
            options={states.map((item, index) => ({
              value: `${index}`,
              label: item.state,
            }))}
            required={false}
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <SelectInput
            callback={clearState}
            control={control}
            defaultValue={values.city}
            isSearchable
            name="city"
            label={`Ciudad${hasTitle ? "" : "*"}`}
            options={cities.map((item, index) => ({
              value: `${index}`,
              label: item,
            }))}
            required={getValues("state")?.length > 0}
            helperText={
              errors.city?.type === "required" && "Ciudad es requerida"
            }
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <TextInput
            callback={clearState}
            control={control}
            defaultValue={values.farm}
            name="farm"
            label={`Finca/Vereda${hasTitle ? "" : "*"}`}
            rules={{
              required: !hasTitle,
              minLength: 3,
            }}
            customError={
              (errors.farm?.type === "required" &&
                "Finca/Vereda es requerida") ||
              (errors.farm?.type === "minLength" &&
                "Finca/Vereda debe tener mínimo 3 caracteres")
            }
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <TextInput
            callback={clearState}
            control={control}
            defaultValue={values.altitude}
            name="altitude"
            label="Altitud"
            type="number"
            rules={{
              required: false,
              minLength: 1,
              validate: (val) => {
                if (val === "" || !val) return true;
                return isNumeric(val.toString()) && val > 0;
              },
            }}
            customError={
              errors.farm?.type === "minLength" &&
              "La altitud debe tener mínimo 1 caracteres"
            }
          />
        </Grid>
      </Grid>
      {!hasTitle && (
        <SuiTypography
          component="label"
          textColor="red"
          variant="caption"
          fontWeight="bold"
        >
          Los campos marcados con * son obligatorios
        </SuiTypography>
      )}
    </>
  );
};
Step2.defaultProps = {
  hasTitle: true,
  values: {},
};
Step2.propTypes = {
  clearState: func.isRequired,
  control: shape({}).isRequired,
  errors: shape({}).isRequired,
  values: shape({}),
  getValues: func.isRequired,
  hasTitle: bool,
};

export const Step3 = ({ values }) => {
  const producer = parseProfileInfo({
    name: values.name,
    document: values.document,
    phone: values.phone,
    email: values.email,
  });
  const finca = parseFincaInfo({
    name: values.farm,
    altitude: values.altitude,
    state: values.state,
    city: values.city,
  });
  return (
    <>
      <SuiBox px={3}>
        <SuiTypography variant="h6" textColor="secondary" fontWeight="bold">
          Productor
        </SuiTypography>
        {producer.map((data, key) => (
          <SuiBox key={key} display="flex" py={1} pr={2}>
            <SuiTypography
              variant="button"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {data.label}:{" "}
              <SuiTypography
                variant="button"
                fontWeight="regular"
                textColor="text"
              >
                &nbsp;{data.value}
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        ))}
      </SuiBox>
      {Object.values(finca).length > 0 && (
        <SuiBox px={3}>
          <SuiTypography variant="h6" textColor="secondary" fontWeight="bold">
            Finca
          </SuiTypography>
          {finca.map((data, key) => (
            <SuiBox key={key} display="flex" py={1} pr={2}>
              <SuiTypography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {data.label}:{" "}
                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textColor="text"
                >
                  &nbsp;{data.value}
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          ))}
        </SuiBox>
      )}
    </>
  );
};
Step3.propTypes = {
  values: shape({}).isRequired,
};
